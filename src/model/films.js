import AbstractObserver from '../utils/abstract-observer';

export default class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, films) {
    this._films = films.slice();

    this._notify(updateType);
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  deleteComment(updateType, update, updatedCommentId) {
    for (const film of this._films) {
      if (film.id === update.id) {
        const index = film.comments.findIndex((comment) => comment.id === updatedCommentId);
        if (index === -1) {
          throw new Error('Can\'t update unexisting comment');
        }
        film.comments = [
          ...film.comments.slice(0, index),
          ...film.comments.slice(index + 1),
        ];
      }
    }

    this._notify(updateType, update);
  }

  static adaptToClient(film) {
    return {
      id: film.id,
      comments: film.comments,
      filmInfo: {
        title: film['film_info']['title'],
        alternativeTitle: film['film_info']['alternative_title'],
        totalRating: film['film_info']['total_rating'],
        poster: film['film_info']['poster'],
        ageRating: film['film_info']['age_rating'],
        director: film['film_info']['director'],
        writers: film['film_info']['writers'],
        actors: film['film_info']['actors'],
        release: {
          date: film['film_info']['release']['date'],
          releaseCountry: film['film_info']['release']['release_country'],
        },
        runTime: film['film_info']['runtime'],
        genre: film['film_info']['genre'],
        description: film['film_info']['description'],
      },
      userDetails: {
        isWatchlist: film['user_details']['watchlist'],
        isAlreadyWatched: film['user_details']['already_watched'],
        isFavorite: film['user_details']['favorite'],
        watchingDate: film['user_details']['already_watched'] ? film['user_details']['watching_date'] : null,
      },
    };
  }

  static adaptToServer(film) {
    return {
      id: film.id,
      comments: film.comments.map((comment) => comment.id ? comment.id : comment),
      'film_info': {
        title: film.filmInfo.title,
        'alternative_title': film.filmInfo.alternativeTitle,
        'total_rating': film.filmInfo.totalRating,
        poster: film.filmInfo.poster,
        'age_rating': film.filmInfo.ageRating,
        director: film.filmInfo.director,
        writers: film.filmInfo.writers,
        actors: film.filmInfo.actors,
        release: {
          date: film.filmInfo.release.date,
          'release_country': film.filmInfo.release.releaseCountry,
        },
        runtime: film.filmInfo.runTime,
        genre: film.filmInfo.genre,
        description: film.filmInfo.description,
      },
      'user_details': {
        'watchlist': film.userDetails.isWatchlist,
        'already_watched': film.userDetails.isAlreadyWatched,
        'favorite': film.userDetails.isFavorite,
        'watching_date': film.userDetails.watchingDate,
      },
    };
  }
}
