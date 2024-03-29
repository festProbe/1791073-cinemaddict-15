import { isDescriptionLarge } from '../../utils/component';
import AbstractComponent from '../abstract-default';
import { transformDuration, transformFilmReleaseDateToYear, transformLongDescriptionToShort } from '../../utils/common';

const createFilmCardsTemplate = (film) => {
  const { title, totalRating, runTime, genre, poster, description } = film.filmInfo;
  const { date } = film.filmInfo.release;
  return `<article class="film-card ">
<h3 class="film-card__title">${title}</h3>
<p class="film-card__rating" value="${totalRating}">${totalRating}</p>
<p class="film-card__info">
  <span class="film-card__year">${transformFilmReleaseDateToYear(date)}</span>
  <span class="film-card__duration">${transformDuration(runTime)}</span>
  <span class="film-card__genre">${genre[0]}</span>
</p>
<img src="${poster}" alt="${title}" class="film-card__poster">
<p class="film-card__description">${isDescriptionLarge(description) ? transformLongDescriptionToShort(description) : description}</p>
<a class="film-card__comments">${film.comments.length} comments</a>
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

  setShowPopupClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._clickHandler);
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._clickHandler);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }
}
