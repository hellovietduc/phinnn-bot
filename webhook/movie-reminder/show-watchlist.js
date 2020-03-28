const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const logger = require('../../utils/logger');

const webhookLogger = logger.of('webhook');

module.exports = async (_, message) => {
    try {
        const chatId = message.chat.id;
        const movies = await prisma.movies();
        if (movies.length === 0) {
            return noti.send('You do not have any movies in your watchlist.', { chatId });
        }
        const texts = ['Movies in your watchlist:'];
        for (const movie of movies) {
            texts.push(`- ${movie.title}`);
        }
        noti.send(texts.join('\n'), { chatId });
    } catch (err) {
        webhookLogger.error('show watchlist', err);
    }
};
