const fs = require('fs');

const cwd = process.cwd();
let mem = {};

module.exports.loadToMem = () => {
    try {
        // eslint-disable-next-line global-require
        const file = require('./data.json');
        mem = { ...file };
    } catch (err) {
        fs.writeFileSync(`${cwd}/db/memory/data.json`, JSON.stringify({}), { encoding: 'utf-8' });
    }
};

module.exports.dumpToFile = () => {
    fs.writeFileSync(`${cwd}/db/memory/data.json`, JSON.stringify(mem), { encoding: 'utf-8' });
};

module.exports.set = (key, value) => {
    mem[key] = JSON.stringify(value);
};

module.exports.get = key => {
    const value = mem[key];
    if (value) {
        return JSON.parse(value);
    }
};
