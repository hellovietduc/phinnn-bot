const enumVal = require('../common/enum');
const noti = require('../utils/noti');

// TODO: check if this message is handled or not
const isHandled = () => false;

const validateBody = reqBody => {
    if (!reqBody.update_id) {
        return 'invalid request: no update_id';
    }
    if (isHandled(reqBody)) {
        return 'request is already handled';
    }
    if (!reqBody.message) {
        return 'request is not a message update';
    }
    if (!reqBody.message.text || !reqBody.message.text.trim()) {
        return 'message is not a text or is empty';
    }
};

const extractCmd = msg => {
    const text = msg.text.trim();
    const msgParts = text.split(' ');

    // cmd is from 0 to first `space` index
    // or first `@` index
    let cmd = msgParts[0];
    let cmdLength = cmd.length;
    if (cmd.includes('@')) {
        cmdLength = cmd.indexOf('@');
        cmd = cmd.slice(cmdLength);
    }

    // rest of the message is content
    const content = text.slice(cmdLength).trim();
    return { cmd, content };
};

module.exports = ({ logger }) => (req, res) => {
    const reqBody = req.body;
    const err = validateBody(reqBody);
    if (err) {
        logger.error(err);
        return res.send(400);
    }

    const { cmd, content } = extractCmd(reqBody.message);
    const handlerName = enumVal.BOT_COMMAND[cmd];
    if (!handlerName) {
        if (reqBody.message.chat && reqBody.message.chat.id) {
            const chatId = reqBody.message.chat.id;
            noti.send('Unknown command.', { chatId });
        }
        logger.error(`unknown command: ${cmd}`, reqBody);
        return res.send(400);
    }

    // safe require because of enums
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const handleFunc = require(`./${handlerName}`);
    handleFunc(content, reqBody.message);
};
