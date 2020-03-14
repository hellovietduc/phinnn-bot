const axios = require('axios');
const logger = require('./logger').of('noti');

const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const defaultOpts = {
    url: `https://api.telegram.org/bot${TOKEN}/sendMessage`,
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    }
};

module.exports.send = async (text, { chatId }) => {
    try {
        await axios({
            ...defaultOpts,
            data: {
                chat_id: chatId,
                text
            }
        });
    } catch (err) {
        logger.error(err);
    }
};
