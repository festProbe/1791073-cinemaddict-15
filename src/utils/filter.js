import { FiltersType } from './constants';

export const filter = {
  [FiltersType.ALL]: (films) => films.slice(),
  [FiltersType.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist),
  [FiltersType.HISTORY]: (films) => films.filter((film) => film.isInHistory),
  [FiltersType.FAVORITES]: (films) => films.filter((film) => film.isInFavorites),
};
