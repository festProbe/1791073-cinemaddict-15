const filmsToFilterMap = {
  Watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  History: (films) => films.filter((film) => film.isInHistory).length,
  Favorites: (films) => films.filter((film) => film.isInFavorites).length,
};

export const generateFilter = (films) => Object.entries(filmsToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);
