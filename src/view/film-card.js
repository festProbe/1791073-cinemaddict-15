import { isDescriptionLarge, DESCRIPTION_LIMIT } from '../utils/utils';

const ACTIVE_BUTTON_CLASS = 'film-card__controls-item--active';

export const createFilmCardsTemplate = (film) => {

  let shortDescrption = film.description;

  if (isDescriptionLarge(film.description)) {
    shortDescrption = `${film.description.split('').slice(0, DESCRIPTION_LIMIT).join('')}...`;
  }

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
    <div class="film-card__controls">
      <button class="${inWatchlistButtonActive} film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="${watchedButtonActive} film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="${inFavoriteButtonActive} film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
