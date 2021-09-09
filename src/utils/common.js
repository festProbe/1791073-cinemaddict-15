import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DESCRIPTION_LIMIT } from './constants';

export const getRandomFloat = (min, max) => {
  const rand = Math.random() * (max - min + 0.1);
  return rand.toFixed(1);
};

export const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const transformDuration = (filmDuration) => {
  dayjs.extend(duration);
  return `${dayjs.duration(filmDuration, 'minutes').hours()}h ${dayjs.duration(filmDuration, 'minutes').minutes()}m`;

};

export const transformFilmReleaseDateToYear = (releaseDate) => dayjs(releaseDate).get('year');

export const transformLongDescriptionToShort = (description) => `${description.split('').slice(0, DESCRIPTION_LIMIT).join('')}...`;

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

export const sortByDate = (filmA, filmB) => dayjs(filmB.date).diff(dayjs(filmA.date));
export const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;
