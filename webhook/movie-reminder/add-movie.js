const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const lang = require('../../lang/movie-reminder');
const logger = require('../../utils/logger');

const webhookLogger = logger.of('webhook');
const movieReminderLogger = logger.of('movie-reminder');

module.exports = async (content, message) => {
    try {
        const chatId = message.chat.id;
        const title = content;
        if (!title) {
            return noti.send(lang.noMovieTitle(), { chatId });
        }
        const movie = await prisma.movie({
            title
        });
        if (movie) {
            noti.send(lang.foundInWatchlist({ title }), { chatId });
        } else {
            await prisma.createMovie({
                title,
                chatId
            });
            noti.send(lang.added({ title }), { chatId });
            movieReminderLogger.success(`added: ${title}`);
        }
    } catch (err) {
        webhookLogger.error('add movie', err);
    }
};
