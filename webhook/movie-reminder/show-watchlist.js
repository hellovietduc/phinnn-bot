const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const lang = require('../../lang/movie-reminder');
const logger = require('../../utils/logger');

const webhookLogger = logger.of('webhook');

module.exports = async (_, message) => {
    try {
        const chatId = message.chat.id;
        const movies = await prisma.movies();
        if (movies.length === 0) {
            return noti.send(lang.emptyWatchlist(), { chatId });
        }
        noti.send(lang.watchlist({ movies }), { chatId });
    } catch (err) {
        webhookLogger.error('show watchlist', err);
    }
};
