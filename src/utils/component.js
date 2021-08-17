import { DESCRIPTION_LIMIT } from './constant';
import { getRandomInteger } from './common';

export const isDescriptionLarge = (description) => description.length > DESCRIPTION_LIMIT;

export const isFilmInWatchlist = () => getRandomInteger(0, 1);

export const isFilmInHistory = () => getRandomInteger(0, 1);

export const isFilmInFavorites = () => getRandomInteger(0, 1);

export const isFilmWatched = () => getRandomInteger(0, 1);
