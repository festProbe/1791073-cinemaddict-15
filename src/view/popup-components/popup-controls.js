import AbstractDefault from '../abstract-component';
import { POPUP_ACTIVE_CONTROL_BUTTON_CLASS } from '../../utils/constants';

const createPopupControlsTemplate = (film) => {
  let inWatchlistButtonActive;
  if (film.isInWatchlist) {
    inWatchlistButtonActive = POPUP_ACTIVE_CONTROL_BUTTON_CLASS;
  }
  let watchedButtonActive;
  if (film.isWatched) {
    watchedButtonActive = POPUP_ACTIVE_CONTROL_BUTTON_CLASS;
  }
  let inFavoriteButtonActive;
  if (film.isInFavorites) {
    inFavoriteButtonActive = POPUP_ACTIVE_CONTROL_BUTTON_CLASS;
  }
  return `<section class="film-details__controls">
    <button type="button" class="${inWatchlistButtonActive} film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="${watchedButtonActive} film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="${inFavoriteButtonActive} film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>`;
};

export default class PopupControls extends AbstractDefault {
  constructor(film) {
    super();
    this._film = film;

    this._inWatchListHandler = this._inWatchListHandler.bind(this);
    this._inWatchedHandler = this._inWatchedHandler.bind(this);
    this._inFavoritesHandler = this._inFavoritesHandler.bind(this);
  }

  getTemplate() { return createPopupControlsTemplate(this._film); }

  _inWatchListHandler(evt) {
    evt.preventDefault();
    this._callback.inWatchlistClick();
  }

  _inWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.inWatchedClick();
  }

  _inFavoritesHandler(evt) {
    evt.preventDefault();
    this._callback.inFavoritesClick();
  }

  setInWatchlistClickHandler(callback) {
    this._callback.inWatchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._inWatchListHandler);
  }

  setInWatchedClickHandler(callback) {
    this._callback.inWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._inWatchedHandler);
  }

  setInFavoritesClickHandler(callback) {
    this._callback.inFavoritesClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._inFavoritesHandler);
  }
}
