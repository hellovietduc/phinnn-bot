const signale = require('signale');

const logLevels = ['success', 'info', 'warn', 'error'];

const stringify = arg => {
    if (!arg) {
        return '';
    }
    if (Array.isArray(arg) || typeof arg === 'object') {
        return JSON.stringify(arg);
    }
    return arg.toString();
};

module.exports.of = serviceName => {
    const defaultMsgObj = { prefix: `[${serviceName}]` };
    const logger = {};
    for (const level of logLevels) {
        logger[level] = (...args) => {
            let message = '';
            for (const arg of args) {
                message += ` ${stringify(arg)}`;
            }
            signale[level]({ ...defaultMsgObj, message });
        };
    }

    return logger;
};
