import { FiltersType } from './constants';

export const Filters = {
  [FiltersType.ALL]: (films) => films.slice(),
  [FiltersType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.isWatchlist),
  [FiltersType.HISTORY]: (films) => films.filter((film) => film.userDetails.isAlreadyWatched),
  [FiltersType.FAVORITES]: (films) => films.filter((film) => film.userDetails.isFavorite),
};
