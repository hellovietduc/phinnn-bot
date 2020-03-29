module.exports = {
    start: ({ pomodoroNum, timeWorking }) => `${pomodoroNum} Pomodoro! ${timeWorking} minutes of focus! Let's get things done! ✨`,

    shortBreak: ({ timeBreak }) => `${timeBreak}-minute break for you. Stand up, rest your eyes and stretch! 🤸`,

    longBreak: ({ timeBreak }) => `You have completed a full pomodoro cycle! 🎉 Time for a ${timeBreak}-minute break. Go around, talk to people and get some water!`,

    stop: () => 'Pomodoro stopped! You can be more productive next time! 😉'
};
