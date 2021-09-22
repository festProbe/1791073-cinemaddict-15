const DESCRIPTION_LIMIT = 140;
const FILM_COUNT = 22;
const FILM_COUNT_PER_STEP = 5;
const TOP_RATED_FILM_COUNT = 2;
const MOST_COMMENTED_FILM_COUNT = 2;
const BAR_HEIGHT = 50;
const SHAKE_ANIMATION_TIMEOUT = 600;
const AUTHORIZATION = 'Basic eo0qw50ik22539a';
const END_POINT = 'https://15.ecmascript.pages.academy/cinemaddict';
const FILM_CARD_ACTIVE_CONTROL_BUTTON_CLASS = 'film-card__controls-item--active';
const POPUP_ACTIVE_CONTROL_BUTTON_CLASS = 'film-details__control-button--active';
const SORT_ACTIVE_BUTTON_CLASS = 'sort__button--active';
const PopupModes = {
  CLOSED: 'closed',
  OPENED: 'opened',
};

const MenuItems = {
  FILMS: 'FILMS',
  STATISTIC: 'STATISTIC',
};

const Emotions = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const SortTypes = {
  DEFAULT: 'default',
  BY_DATE: 'by-date',
  BY_RATE: 'by-rating',
};

const UserActions = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
  UPDATE_COMMENTS: 'UPDATE_COMMENTS',
};

const FiltersType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

const Periods = {
  ALL_TIME: 'all-time',
  TODAY: 'today',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};

const Methods = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299,
};


export {
  DESCRIPTION_LIMIT,
  FILM_COUNT,
  FILM_COUNT_PER_STEP,
  TOP_RATED_FILM_COUNT,
  MOST_COMMENTED_FILM_COUNT,
  BAR_HEIGHT,
  SHAKE_ANIMATION_TIMEOUT,
  AUTHORIZATION,
  END_POINT,
  POPUP_ACTIVE_CONTROL_BUTTON_CLASS,
  FILM_CARD_ACTIVE_CONTROL_BUTTON_CLASS,
  SORT_ACTIVE_BUTTON_CLASS,
  PopupModes,
  SortTypes,
  UserActions,
  UpdateType,
  FiltersType,
  Emotions,
  MenuItems,
  Periods,
  Methods,
  SuccessHTTPStatusRange
};
