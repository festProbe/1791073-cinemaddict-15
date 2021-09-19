import AbstractComponent from '../abstract-component';
import { FILM_CARD_ACTIVE_CONTROL_BUTTON_CLASS } from '../../utils/constants';

export const createControlsTemplate = (film) => {
  let inWatchlistButtonActive = '';
  if (film.isInWatchlist) {
    inWatchlistButtonActive = FILM_CARD_ACTIVE_CONTROL_BUTTON_CLASS;
  }
  let inHistoryButtonActive;
  if (film.isInHistory) {
    inHistoryButtonActive = FILM_CARD_ACTIVE_CONTROL_BUTTON_CLASS;
  }
  let inFavoriteButtonActive;
  if (film.isInFavorites) {
    inFavoriteButtonActive = FILM_CARD_ACTIVE_CONTROL_BUTTON_CLASS;
  }

  return `<div class="film-card__controls">
  <button class="${inWatchlistButtonActive} film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="${inHistoryButtonActive} film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
  <button class="${inFavoriteButtonActive} film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>`;
};

export default class FilmCardControls extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;

    this._inWatchListHandler = this._inWatchListHandler.bind(this);
    this._inHistoryHandler = this._inHistoryHandler.bind(this);
    this._inFavoritesHandler = this._inFavoritesHandler.bind(this);
  }

  getTemplate() { return createControlsTemplate(this._film); }

  _inWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.inWatchlistClick();
  }

  _inHistoryHandler(evt) {
    evt.preventDefault();
    this._callback.inHistoryClick();
  }

  _inFavoritesHandler(evt) {
    evt.preventDefault();
    this._callback.inFavoritesClick();
  }

  setInWatchlistClickHandler(callback) {
    this._callback.inWatchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._inWatchListHandler);
  }

  setInHistoryClickHandler(callback) {
    this._callback.inHistoryClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._inHistoryHandler);
  }

  setInFavoritesClickHandler(callback) {
    this._callback.inFavoritesClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._inFavoritesHandler);
  }
}
