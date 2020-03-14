const { prisma } = require('../db/prisma');
const noti = require('../utils/noti');
const logger = require('../utils/logger');

const movieReminderLogger = logger.of('movie-reminder');

module.exports = async (content, message) => {
    const chatId = message.chat.id;
    const movieTitle = content;
    try {
        if (!movieTitle) {
            return noti.send('Please specify movie name!', { chatId });
        }
        await prisma.deleteMovie({
            title: movieTitle
        });
        noti.send(`Removed movie '${movieTitle}' from watchlist.`, { chatId });
        movieReminderLogger.info(`removed: ${movieTitle}`);
    } catch (err) {
        noti.send(`Movie '${movieTitle}' does not exist.`, { chatId });
    }
};
