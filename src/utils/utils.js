const DESCRIPTION_LIMIT = 140;

const isDescriptionLarge = (description) => description.length > DESCRIPTION_LIMIT;

const getRandomFloat = (min, max) => {
  const rand = Math.random() * (max - min + 0.1);
  return rand.toFixed(1);
};

const getRandomInteger = (min, max) => {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
};

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const renderElement = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const isFilmInWatchlist = () => getRandomInteger(0, 1);

const isFilmInHistory = () => getRandomInteger(0, 1);

const isFilmInFavorites = () => getRandomInteger(0, 1);

const isFilmWatched = () => getRandomInteger(0, 1);

export { getRandomFloat, getRandomInteger, isDescriptionLarge, DESCRIPTION_LIMIT, isFilmInWatchlist, isFilmInHistory, isFilmInFavorites, isFilmWatched };
