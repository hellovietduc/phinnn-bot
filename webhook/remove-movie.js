// const db = require('../db/mem');
// const noti = require('../utils/noti');
// const logger = require('../utils/logger').of('movie-reminder');

// module.exports = (content, msgObj) => {
//     const chatId = msgObj.chat.id;
//     if (!content) {
//         return noti.send('Please specify movie name!', { chatId });
//     }

//     const removed = db.del(`movie:${content}`);

//     if (removed) {
//         noti.send(`Removed movie: '${content}' from watchlist.`, { chatId });
//         logger.info(`removed: ${content}`);
//     } else {
//         noti.send(`Movie: '${content}' doesn't exist.`, { chatId });
//     }
// };

module.exports = () => { };
