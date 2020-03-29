const pomodoroJob = require('../../jobs/pomodoro');
const logger = require('../../utils/logger');

const webhookLogger = logger.of('webhook');

module.exports = async (_, message) => {
    try {
        const chatId = message.chat.id;
        pomodoroJob.stop({ chatId });
    } catch (err) {
        webhookLogger.error('stop pomodoro', err);
    }
};
