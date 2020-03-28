const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const logger = require('../../utils/logger');

const webhookLogger = logger.of('webhook');
const movieReminderLogger = logger.of('movie-reminder');

module.exports = async (content, message) => {
    try {
        const chatId = message.chat.id;
        const movieTitle = content;
        if (!movieTitle) {
            return noti.send('Please specify movie name!', { chatId });
        }
        const movie = await prisma.movie({
            title: movieTitle
        });
        if (movie) {
            noti.send(`Movie '${movieTitle}' is already added to watchlist.`, { chatId });
        } else {
            await prisma.createMovie({
                title: movieTitle
            });
            noti.send(`Added movie '${movieTitle}' to watchlist.`, { chatId });
            movieReminderLogger.success(`added: ${movieTitle}`);
        }
    } catch (err) {
        webhookLogger.error('add movie', err);
    }
};
