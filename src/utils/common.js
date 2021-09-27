import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { DESCRIPTION_LIMIT, Periods } from './constants';

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
export const transformFilmReleaseDate = (releaseDate) => dayjs(releaseDate).format('DD MMMM YYYY');

export const transformLongDescriptionToShort = (description) => `${description.split('').slice(0, DESCRIPTION_LIMIT).join('')}...`;

export const sortByDate = (filmA, filmB) => dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
export const sortByRating = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

const changeStatisticByPeriod = (films, dateTo, currentPeriod) => {
  switch (currentPeriod) {
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
};

export const getStatistic = (state) => {
  const watchedFilms = state.films.filter((film) => film.userDetails.isAlreadyWatched);
  const watchedFilmsByPeriod = changeStatisticByPeriod(watchedFilms, state.dateTo, state.currentPeriod);
  const currentWatchedFilmsCount = watchedFilmsByPeriod.length;
  const uniqueGenres = new Map();

  for (const film of watchedFilmsByPeriod) {
    for (const genre of film.filmInfo.genre) {
      uniqueGenres.set(genre, 0);
    }
  }
  const GenresStatistic = Object.fromEntries(uniqueGenres);

  watchedFilmsByPeriod.forEach((film) => {
    for (const value of film.filmInfo.genre) {
      if (Object.keys(GenresStatistic).includes(value)) {
        GenresStatistic[value] += 1;
      }
    }
  });

  const sortedGenresCount = Object.entries(GenresStatistic)
    .sort(([, a], [, b]) => b - a)
    .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});

  return Object.assign(
    {},
    {
      genresStats: sortedGenresCount,
      currentWatchedFilmsCount,
      topGenre: Object.keys(sortedGenresCount)[0],
      watchedFilmsByPeriod,
    },
  );
};

export const isOnline = () => window.navigator.onLine;
