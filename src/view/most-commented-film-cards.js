import { isDescriptionLarge, DESCRIPTION_LIMIT } from '../utils/utils';

export const createMostCommentedFilmsTemplate = (film) => {

  const { filmName, poster, rating, duration, genre, year, description, commentsCount } = film;

  let shortDescrption = description;

  if (isDescriptionLarge(description)) {
    shortDescrption = `${description.split('').slice(0, DESCRIPTION_LIMIT).join('')}...`;
  }

  return `<article class="film-card ">
  <h3 class="film-card__title">${filmName}</h3>
  <p class="film-card__rating" value="${rating}">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="${poster}" alt="${filmName}" class="film-card__poster">
    <p class="film-card__description">${shortDescrption}</p>
    <a class="film-card__comments">${commentsCount} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};
