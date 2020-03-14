const restana = require('restana');
const bodyParser = require('body-parser');
const nodeCleanup = require('node-cleanup');
const webhookHandler = require('./webhook');
const memory = require('./db/memory');
const logger = require('./utils/logger');

const mainLogger = logger.of('main');
const webhookLogger = logger.of('webhook');

const PORT = Number(process.env.PORT);
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const errorHandler = (err, req, res) => {
    webhookLogger.error('unhandled error', err);
    res.send(500);
};

const authHandler = (req, res, next) => {
    const { token } = req.params;
    if (token === TELEGRAM_BOT_TOKEN) {
        next();
    } else {
        webhookLogger.error(`unauthorized request: ${req.url}`, req.body);
        res.send(401);
    }
};

const api = restana({ errorHandler });
api.use(bodyParser.json());

api.post('/updates/:token', authHandler, webhookHandler);

api.start(PORT).then(() => {
    memory.loadToMem();
    mainLogger.info('phinnn started');
    webhookLogger.info(`listening on port ${PORT}`);
});

nodeCleanup(() => {
    memory.dumpToFile();
    mainLogger.info('phinnn stopped');
});
