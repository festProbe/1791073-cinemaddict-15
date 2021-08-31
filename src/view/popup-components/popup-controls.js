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
  }

  getTemplate() { return createPopupControlsTemplate(this._film); }
}
