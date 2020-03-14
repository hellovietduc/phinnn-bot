// const db = require('../db/mem');
// const noti = require('../utils/noti');

// module.exports = (_, msgObj) => {
//     const movies = db.keys()
//         .filter(key => key.startsWith('movie:'))
//         .map(key => db.get(key));

//     if (movies.length === 0) {
//         return noti.send('You don\'t have any movies in your watchlist.');
//     }

//     const chatId = msgObj.chat.id;
//     const texts = ['Movies in your watchlist:'];
//     for (const movie of movies) {
//         texts.push(`- ${movie.title}`);
//     }
//     noti.send(texts.join('\n'), { chatId });
// };

module.exports = () => { };
