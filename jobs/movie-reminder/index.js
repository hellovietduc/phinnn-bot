const { CronJob } = require('cron');
const enumVal = require('../../common/enum');
const { prisma } = require('../../db/prisma');
const noti = require('../../utils/noti');
const lang = require('../../lang/movie-reminder');
const logger = require('../../utils/logger');

const movieReminderLogger = logger.of('movie-reminder');

const remindMovie = async () => {
    try {
        const movies = await prisma.movies();
        if (movies.length === 0) return;

        // pick a random movie
        const { title, chatId } = movies[Math.floor(Math.random() * movies.length)];
        noti.send(lang.remind({ title }), { chatId });

        await prisma.deleteMovie({ title });
        movieReminderLogger.info(`removed: ${title}`);
    } catch (err) {
        movieReminderLogger.error('remind movie', err);
    }
};

module.exports.start = () => {
    const cron = process.env.MOVIE_REMINDER_CRON || enumVal.MOVIE_REMINDER.DEFAULT_CRON;
    const job = new CronJob(cron, remindMovie);
    job.start();
};
