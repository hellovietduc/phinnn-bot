// const db = require('../db/mem');
// const noti = require('../utils/noti');
// const logger = require('../utils/logger').of('movie-reminder');

// module.exports = (content, msgObj) => {
//     const chatId = msgObj.chat.id;
//     if (!content) {
//         return noti.send('Please specify movie name!', { chatId });
//     }

//     db.set(`movie:${content}`, {
//         title: content
//     });

//     noti.send(`Added movie: '${content}' to watchlist.`, { chatId });
//     logger.success(`added: ${content}`);
// };

module.exports = () => { };
