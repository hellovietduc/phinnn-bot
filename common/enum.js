module.exports.BOT_COMMAND = {
    '/addmovie': 'movie-reminder/add-movie',
    '/removemovie': 'movie-reminder/remove-movie',
    '/showwatchlist': 'movie-reminder/show-watchlist',
    '/startpomodoro': 'pomodoro/start-pomodoro',
    '/stoppomodoro': 'pomodoro/stop-pomodoro'
};

module.exports.MOVIE_REMINDER = {
    DEFAULT_CRON: '0 11 * * 6'
};

module.exports.POMODORO = {
    STATE: {
        NOT_RUNNING: 'not_running',
        WORKING: 'working',
        SHORT_BREAK: 'short_break',
        LONG_BREAK: 'long_break'
    },
    TIME: {
        WORKING: 25,
        SHORT_BREAK: 5,
        LONG_BREAK: 15
    },
    CYCLES_TO_RESET: 4
};
