const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const lang = require('../../lang/movie-reminder');
const logger = require('../../utils/logger');

const movieReminderLogger = logger.of('movie-reminder');

module.exports = async (content, message) => {
    const chatId = message.chat.id;
    const title = content;
    try {
        if (!title) {
            return noti.send(lang.noMovieTitle(), { chatId });
        }
        await prisma.deleteMovie({
            title
        });
        noti.send(lang.removed({ title }), { chatId });
        movieReminderLogger.info(`removed: ${title}`);
    } catch (err) {
        noti.send(lang.notFound({ title }), { chatId });
    }
};
