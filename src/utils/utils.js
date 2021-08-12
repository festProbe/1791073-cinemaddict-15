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

const renderPage = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const isFilmInWatchlist = () => getRandomInteger(0, 1);

const isFilmInHistory = () => getRandomInteger(0, 1);

const isFilmInFavorites = () => getRandomInteger(0, 1);

const isFilmWatched = () => getRandomInteger(0, 1);

export { getRandomFloat, getRandomInteger, renderPage, isDescriptionLarge, DESCRIPTION_LIMIT, isFilmInWatchlist, isFilmInHistory, isFilmInFavorites, isFilmWatched };
