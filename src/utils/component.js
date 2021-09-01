import { DESCRIPTION_LIMIT } from './constants';
import { getRandomInteger } from './common';

export const isDescriptionLarge = (description) => description.length > DESCRIPTION_LIMIT;

export const isFilmInWatchlist = () => Boolean(getRandomInteger(0, 1));

export const isFilmInHistory = () => Boolean(getRandomInteger(0, 1));

export const isFilmInFavorites = () => Boolean(getRandomInteger(0, 1));

export const isFilmWatched = () => Boolean(getRandomInteger(0, 1));

export const isCommentTodayOrYesterday = (daysGap) => {
  switch (daysGap) {
    case 0:
      return 'Today';
    case 1:
      return 'Yesterday';
    case 2:
      return '2 days ago';
  }
};
