import { isDescriptionLarge, DESCRIPTION_LIMIT } from '../utils/utils';

export const createFilmCardsTemplate = (film) => {

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
