import { getRandomFloat, getRandomInteger} from '../utils/common';
import { isFilmInFavorites, isFilmInHistory, isFilmInWatchlist, isFilmWatched } from '../utils/component';
import dayjs from 'dayjs';

const FilmsInfo = {
  _POSTERS_URL: [
    '/images/posters/made-for-each-other.png',
    '/images/posters/popeye-meets-sinbad.png',
    'images/posters/sagebrush-trail.jpg',
    '/images/posters/santa-claus-conquers-the-martians.jpg',
    '/images/posters/the-dance-of-life.jpg',
    '/images/posters/the-great-flamarion.jpg',
    '/images/posters/the-man-with-the-golden-arm.jpg',
  ],

  _FILM_NAMES: [
    'Made for each other',
    'Popeye meets sinbad',
    'Sagebrush trail',
    'Santa claus conquers the martians',
    'The dance of life',
    'The great flamarion',
    'The man with the golden arm',
  ],

  _GENRES: [
    'Musical',
    'Western',
    'Drama',
    'Comedy',
    'Cartoon',
  ],

  _DESCRIPTION: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  ],

  _DIRECTORS: [
    'Woody Allen',
    'Robert Altman',
    'Ingmar Bergman',
    'Mel Brooks',
    'Tim Burton',
  ],

  _SCREEN_WRITERS: [
    'Billy Wilder',
    'Robert Towne',
    'Quentin Tarantino',
    'Francis Ford Coppola',
    'William Goldman',
  ],

  _ACTORS: [
    'Morgan Freeman',
    'Brad Pitt',
    'Leonardo DiCaprio',
    'Robert De Niro',
    'Michael Caine',
    'Matt Damon',
    'Christian Bale',
    'Tom Hanks',
    'Gary Oldman',
    'Al Pacino',
    'Bruce Willis',
    'Harrison Ford',
  ],

  _COUNTRIES: [
    'USA',
    'India',
    'Canada',
    'UK',
    'France',
    'Russia',
  ],

  _AGE_LIMITS: [
    'G — Нет возрастных ограничений',
    'PG — Рекомендуется присутствие родителей',
    'PG-13 — Детям до 13 лет просмотр не желателен',
    'R — Лицам до 17 лет обязательно присутствие взрослого',
    'NC-17 — Лицам до 18 лет просмотр запрещен',
  ],

  getId() { return getRandomInteger(0, 99999999); },
  getPoster() { return this._POSTERS_URL[getRandomInteger(0, this._POSTERS_URL.length - 1)]; },
  getName() { return this._FILM_NAMES[getRandomInteger(0, this._FILM_NAMES.length - 1)]; },
  getDirectorName() { return this._DIRECTORS[getRandomInteger(0, this._DIRECTORS.length - 1)]; },
  getScreenWriterName() { return this._SCREEN_WRITERS[getRandomInteger(0, this._SCREEN_WRITERS.length - 1)]; },
  getActorsNames() {
    const actors = [];
    this._ACTORS.forEach((it) => {
      const random = getRandomInteger(0, 1);
      if (random) {
        actors.push(it);
      }
    });
    return actors.join(', ');
  },
  getRating() { return getRandomFloat(0, 10); },

  getGenres() {
    const genres = [];
    this._GENRES.forEach((it) => {
      const random = getRandomInteger(0, 1);
      if (random) {
        genres.push(it);
      }
    });
    return genres;
  },
  getDate() {
    const day = getRandomInteger(1, 29);
    const month = getRandomInteger(0, 11);
    const year = `19${getRandomInteger(0, 9)}${getRandomInteger(0, 9)}`;
    return dayjs().date(day).month(month).year(year).format('DD MMMM YYYY');
  },
  getYear() { return `19${getRandomInteger(10, 99)}`; },
  getDuration() { return `${getRandomInteger(1, 2)}h ${getRandomInteger(0, 60)}m`; },
  getDescription() { return this._DESCRIPTION[getRandomInteger(0, this._DESCRIPTION.length - 1)]; },
  getCountry() { return this._COUNTRIES[getRandomInteger(0, this._COUNTRIES.length - 1)]; },
  getAgeLimit() { return this._AGE_LIMITS[getRandomInteger(0, this._AGE_LIMITS.length - 1)]; },
  getCommentCount() { return getRandomInteger(0, 5); },
};

const genetateFilmCard = () => {
  const filmCard = {
    id: FilmsInfo.getId(),
    poster: FilmsInfo.getPoster(),
    filmName: FilmsInfo.getName(),
    rating: FilmsInfo.getRating(),
    year: dayjs(FilmsInfo.getDate()).get('year'),
    duration: FilmsInfo.getDuration(),
    genre: FilmsInfo.getGenres()[0],
    description: FilmsInfo.getDescription(),
    commentsCount: FilmsInfo.getCommentCount(),
    date: FilmsInfo.getDate(),
    directorName: FilmsInfo.getDirectorName(),
    screenWriters: FilmsInfo.getScreenWriterName(),
    actors: FilmsInfo.getActorsNames(),
    country: FilmsInfo.getCountry(),
    ageLimit: FilmsInfo.getAgeLimit(),
    genres: FilmsInfo.getGenres(),
    isInWatchlist: isFilmInWatchlist(),
    isInHistory: isFilmInHistory(),
    isInFavorites: isFilmInFavorites(),
    isWatched: isFilmWatched(),
  };
  return filmCard;
};

export { genetateFilmCard };
