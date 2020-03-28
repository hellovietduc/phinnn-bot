const enumVal = require('../common/enum');
const memory = require('../db/memory');
const noti = require('../utils/noti');
const logger = require('../utils/logger');

const webhookLogger = logger.of('webhook');

const isUpdateHandled = reqBody => {
    const updateId = reqBody.update_id;
    return memory.get(`handled_updates:${updateId}`);
};

const setUpdateHandled = reqBody => {
    const updateId = reqBody.update_id;
    memory.set(`handled_updates:${updateId}`, true);
};

const validateBody = reqBody => {
    if (!reqBody.update_id) {
        return 'invalid request: no update_id';
    }
    if (isUpdateHandled(reqBody)) {
        return `request is already handled: ${reqBody.update_id}`;
    }
    if (!reqBody.message) {
        return 'request is not a message update';
    }
    if (!reqBody.message.text || !reqBody.message.text.trim()) {
        return 'message is not a text or is empty';
    }
    if (!reqBody.message.chat || !reqBody.message.chat.id) {
        return 'request does not have chat_id';
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

module.exports = (req, res) => {
    const reqBody = req.body;
    const err = validateBody(reqBody);
    if (err) {
        webhookLogger.error(err);
        return res.send(400);
    }

    setUpdateHandled(reqBody);

    const { cmd, content } = extractCmd(reqBody.message);
    const handlerName = enumVal.BOT_COMMAND[cmd];
    if (!handlerName) {
        const chatId = reqBody.message.chat.id;
        noti.send('Unknown command.', { chatId });
        webhookLogger.error(`unknown command: ${cmd}`, reqBody);
        return res.send(400);
    }

    res.send(200);

    // safe require because of enums
    // eslint-disable-next-line import/no-dynamic-require, global-require
    const handleFunc = require(`./${enumVal.COMMAND_GROUP.MOVIE_REMINDER}/${handlerName}`);
    handleFunc(content, reqBody.message);
};
