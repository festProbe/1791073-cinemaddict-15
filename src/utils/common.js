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

export const sortByDate = (filmA, filmB) => dayjs(filmB.releaseDate).diff(dayjs(filmA.releaseDate));
export const sortByRating = (filmA, filmB) => filmB.rating - filmA.rating;

export const getGenresStatistic = (state) => {
  const GenresStatistic = {
    'Musical': 0,
    'Western': 0,
    'Drama': 0,
    'Cartoon': 0,
    'Comedy': 0,
  };
  state.films.forEach((film) => {
    for (const value of film.genres) {
      switch (value) {
        case 'Musical': GenresStatistic.Musical += 1; break;
        case 'Western': GenresStatistic.Western += 1; break;
        case 'Drama': GenresStatistic.Drama += 1; break;
        case 'Cartoon': GenresStatistic.Cartoon += 1; break;
        case 'Comedy': GenresStatistic.Comedy += 1; break;
      }
    }
  });

  return GenresStatistic;
};

/*const changeStatisticByPeriod = (films, dateFrom, dateTo, currentInput) => {
  switch (currentInput) {
    case Periods.ALL_TIME:
      return films;
    case Periods.TODAY:
      return films.filter((film) => dayjs(film.userDetails.watchingDate).isSame(dateTo, 'day'));
    case Periods.WEEK:
      return films.filter((film) => dayjs(film.userDetails.watchingDate).isSame(dateTo, 'week'));
    case Periods.MONTH:
      return films.filter((film) => dayjs(film.userDetails.watchingDate).isSame(dateTo, 'month'));
    case Periods.YEAR:
      return films.filter((film) => dayjs(film.userDetails.watchingDate).isSame(dateTo, 'year'));
  }
};*/

export const calculateMaxCountGenre = (GenresStatistic) => Object.keys(GenresStatistic).find((key) => GenresStatistic[key] === Math.max(GenresStatistic.Musical, GenresStatistic.Western, GenresStatistic.Drama, GenresStatistic.Comedy, GenresStatistic.Cartoon));
