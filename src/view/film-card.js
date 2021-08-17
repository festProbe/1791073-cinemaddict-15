import { DESCRIPTION_LIMIT } from '../utils/constant';
import { isDescriptionLarge } from '../utils/component';
import AbstractComponent from './abstract-component';

const createFilmCardsTemplate = (film) => {

  let shortDescrption = film.description;

  if (isDescriptionLarge(film.description)) {
    shortDescrption = `${film.description.split('').slice(0, DESCRIPTION_LIMIT).join('')}...`;
  }

  return `<article class="film-card ">
  <h3 class="film-card__title">${film.filmName}</h3>
  <p class="film-card__rating" value="${film.rating}">${film.rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${film.year}</span>
    <span class="film-card__duration">${film.duration}</span>
    <span class="film-card__genre">${film.genre}</span>
  </p>
  <img src="${film.poster}" alt="${film.filmName}" class="film-card__poster">
  <p class="film-card__description">${shortDescrption}</p>
  <a class="film-card__comments">${film.commentsCount} comments</a>
  </article>`;
};

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardsTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }
}
