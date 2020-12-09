const taskToFilterMap = {
  watchlist: (movies) => movies.filter((movie) => movie.isInWatchlist).length,
  history: (movies) => movies.filter((movie) => movie.isWatched).length,
  favorite: (movies) => movies.filter((movie) => movie.isFavorite).length,
};

export const generateFilter = (movies) => {
  return Object.entries(taskToFilterMap).map(([filterName, countMovies]) => {
    return {
      name: filterName,
      count: countMovies(movies),
    };
  });
};
