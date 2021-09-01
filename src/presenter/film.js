import FilmCardComponent from '../view/film-card-components/film-card';
import FilmCardControls from '../view/film-card-components/film-controls';
import FilmDetails from './popup';
import { renderElement, RenderPosition, replace, remove } from '../utils/render';

export default class filmCard {
  constructor(container, changeData, popupChangeMode) {
    this._container = container;
    this._changeData = changeData;
    this._popupChangeMode = popupChangeMode;

    this._filmCard = null;
    this._filmControls = null;
    this._popupPresenter = null;

    this._handleShowPopupClick = this._handleShowPopupClick.bind(this);

    this._handleToWatchlist = this._handleToWatchlist.bind(this);
    this._handleToWatched = this._handleToWatched.bind(this);
    this._handleToFavorites = this._handleToFavorites.bind(this);

  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCard;

    this._filmCard = new FilmCardComponent(this._film);
    this._filmControls = new FilmCardControls(this._film);

    this._filmCard.setClickHandler(this._handleShowPopupClick);
    this._filmControls.setInWatchlistClickHandler(this._handleToWatchlist);
    this._filmControls.setInWatchedClickHandler(this._handleToWatched);
    this._filmControls.setInFavoritesClickHandler(this._handleToFavorites);

    if (prevFilmComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCard, prevFilmComponent);
      this._renderFilmControls();
      if (this._popupPresenter !== null) {
        this._handleShowPopupClick();
      }
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmControls);
  }

  resetView() {
    if (this._popupPresenter !== null) {
      this._popupPresenter.resetView();
    }
  }

  _handleToWatchlist() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleToWatched() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isWatched: !this._film.isWatched,
        },
      ),
    );
  }

  _handleToFavorites() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isInFavorites: !this._film.isInFavorites,
        },
      ),
    );
  }

  _renderFilmControls() {
    renderElement(this._filmCard, this._filmControls, RenderPosition.BEFOREEND);
  }

  _handleShowPopupClick() {
    this._popupChangeMode();
    this._popupPresenter = new FilmDetails(this._popupChangeMode, this._changeData);
    this._popupPresenter.init(this._film);
  }

  _renderFilmCard() {
    this._renderFilmControls();
    this._filmCard.setClickHandler(this._handleShowPopupClick);
    renderElement(this._container, this._filmCard, RenderPosition.BEFOREEND);
  }
}
