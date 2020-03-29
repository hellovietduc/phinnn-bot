const enumVal = require('../../common/enum');
const noti = require('../../utils/noti');
const lang = require('../../lang/pomodoro');
const logger = require('../../utils/logger');

const pomodoroLogger = logger.of('pomodoro');

class Pomodoro {
    constructor({
        timeWorking,
        timeShortBreak,
        timeLongBreak,
        cyclesToReset,
        chatId
    }) {
        this.state = enumVal.POMODORO.STATE.NOT_RUNNING;
        this.pomodoroCount = 0;
        this.timeWorking = timeWorking;
        this.timeShortBreak = timeShortBreak;
        this.timeLongBreak = timeLongBreak;
        this.cyclesToReset = cyclesToReset;
        this.notiOpts = { chatId };
        this.timeouts = [];
    }

    next() {
        const { STATE } = enumVal.POMODORO;
        if (this.state === STATE.NOT_RUNNING
            || this.state === STATE.SHORT_BREAK
            || this.state === STATE.LONG_BREAK
        ) {
            this.state = STATE.WORKING;
            this.pomodoroCount += 1;
            const t = setTimeout(() => this.next(), this.timeWorking * 60 * 1000);
            this.timeouts.push(t);

            noti.send(
                lang.start({
                    pomodoroNum: `#${this.pomodoroCount}`,
                    timeWorking: this.timeWorking
                }),
                this.notiOpts
            );
            pomodoroLogger.info('start', new Date());
        } else if (this.state === STATE.WORKING) {
            if (this.pomodoroCount === this.cyclesToReset) {
                this.state = STATE.LONG_BREAK;
                this.pomodoroCount = 0;
                const t = setTimeout(() => this.next(), this.timeLongBreak * 60 * 1000);
                this.timeouts.push(t);

                noti.send(
                    lang.longBreak({
                        pomodoroNum: '#4',
                        timeBreak: this.timeLongBreak
                    }),
                    this.notiOpts
                );
                pomodoroLogger.info('long break', new Date());
            } else {
                this.state = STATE.SHORT_BREAK;
                const t = setTimeout(() => this.next(), this.timeShortBreak * 60 * 1000);
                this.timeouts.push(t);

                noti.send(
                    lang.shortBreak({
                        pomodoroNum: `#${this.pomodoroCount}`,
                        timeBreak: this.timeShortBreak
                    }),
                    this.notiOpts
                );
                pomodoroLogger.info('short break', new Date());
            }
        }
    }

    stop() {
        this.state = enumVal.POMODORO.STATE.NOT_RUNNING;
        this.pomodoroCount = 0;
        this.timeouts.forEach(t => clearTimeout(t));

        noti.send(lang.stop(), this.notiOpts);
        pomodoroLogger.info('stop');
    }
}

const pomodoroDict = {};

module.exports.start = ({ chatId }) => {
    const timeWorking = Number(process.env.POMODORO_TIME_WORKING)
        || enumVal.POMODORO.TIME.WORKING;
    const timeShortBreak = Number(process.env.POMODORO_TIME_SHORT_BREAK)
        || enumVal.POMODORO.TIME.SHORT_BREAK;
    const timeLongBreak = Number(process.env.POMODORO_TIME_LONG_BREAK)
        || enumVal.POMODORO.TIME.LONG_BREAK;
    const cyclesToReset = Number(process.env.POMODORO_CYCLES_TO_RESET)
        || enumVal.POMODORO.CYCLES_TO_RESET;
    const pomodoro = new Pomodoro({
        timeWorking,
        timeShortBreak,
        timeLongBreak,
        cyclesToReset,
        chatId
    });
    pomodoro.next();
    pomodoroDict[chatId] = pomodoro;
};

module.exports.stop = ({ chatId }) => {
    const pomodoro = pomodoroDict[chatId];
    if (pomodoro) {
        pomodoro.stop();
        pomodoroDict[chatId] = undefined;
    }
};
