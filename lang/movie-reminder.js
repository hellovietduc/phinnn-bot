module.exports = {
    noMovieTitle: () => 'Please specify movie name!',

    notFound: ({ title }) => `Movie '${title}' is not found.`,

    foundInWatchlist: ({ title }) => `Movie '${title}' is already added to watchlist.`,

    emptyWatchlist: () => 'You do not have any movies in your watchlist.',

    watchlist: ({ movies }) => {
        const texts = ['Movies in your watchlist:'];
        for (const movie of movies) {
            texts.push(`- ${movie.title}`);
        }
        return texts.join('\n');
    },

    added: ({ title }) => `Added movie '${title}' to watchlist.`,

    removed: ({ title }) => `Removed movie '${title}' from watchlist.`,

    remind: ({ title }) => `Let's watch '${title}' today!`

};
