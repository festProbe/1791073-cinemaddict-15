import AbstractComponent from './abstract-component';

const ACTIVE_BUTTON_CLASS = 'film-card__controls-item--active';

export const createControlsTemplate = (film) => {
  let inWatchlistButtonActive;
  if (film.isInWatchlist) {
    inWatchlistButtonActive = ACTIVE_BUTTON_CLASS;
  }
  let watchedButtonActive;
  if (film.isWatched) {
    watchedButtonActive = ACTIVE_BUTTON_CLASS;
  }
  let inFavoriteButtonActive;
  if (film.isInFavorites) {
    inFavoriteButtonActive = ACTIVE_BUTTON_CLASS;
  }

  return `<div class="film-card__controls">
  <button class="${inWatchlistButtonActive} film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="${watchedButtonActive} film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
  <button class="${inFavoriteButtonActive} film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
</div>`;
};

export default class FilmCardControls extends AbstractComponent {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createControlsTemplate(this._film);
  }
}
