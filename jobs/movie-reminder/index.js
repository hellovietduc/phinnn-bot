const chall = require('chall');
const enumVal = require('../../common/enum');
const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const logger = require('../../utils/logger');

const movieReminderLogger = logger.of('movie-reminder');

const remindMovie = async () => {
    try {
        const movies = await prisma.movies();
        if (movies.length === 0) return;

        // pick a random movie
        const { title, chatId } = movies[Math.floor(Math.random() * movies.length)];
        noti.send(`Let's watch '${title}' today!`, { chatId });

        await prisma.deleteMovie({ title });
        movieReminderLogger.info(`removed: ${title}`);
    } catch (err) {
        movieReminderLogger.error('remind movie', err);
    }
};

module.exports.start = () => {
    const time = process.env.MOVIE_REMINDER_TIME;
    const interval = Number(process.env.MOVIE_REMINDER_INTERVAL);
    chall.schedule(
        remindMovie,
        time || enumVal.MOVIE_REMINDER.DEFAULT_TIME,
        interval || enumVal.MOVIE_REMINDER.DEFAULT_INTERVAL
    );
};
