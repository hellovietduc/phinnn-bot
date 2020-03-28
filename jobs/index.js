const movieReminder = require('./movie-reminder');

module.exports.runRepeatedJobs = () => {
    movieReminder.start();
};
