import FilmCardComponent from '../view/film-card-components/film-card';
import FilmCardControls from '../view/film-card-components/film-controls';
import FilmDetailsView from '../view/film-card-components/popup';
import { renderElement, RenderPosition, replace, remove } from '../utils/render';
import { FiltersType, UpdateType, UserActions } from '../utils/constants';
import AbstractObserver from '../utils/abstract-observer';

const observer = new AbstractObserver();

export default class filmCard {
  constructor(container, changeData, currentFilterType) {
    this._container = container;
    this._changeData = changeData;
    this._currentFilterType = currentFilterType;

    this._body = document.querySelector('body');

    this._filmCard = null;
    this._filmControls = null;
    this._popup = null;
    this._film = null;

    this._renderPopup = this._renderPopup.bind(this);
    this._destroyPopup = this._destroyPopup.bind(this);
    this._onEscClosePopup = this._onEscClosePopup.bind(this);
    this._handleToWatchlist = this._handleToWatchlist.bind(this);
    this._handleToHistory = this._handleToHistory.bind(this);
    this._handleToFavorites = this._handleToFavorites.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleSubmitNewComment = this._handleSubmitNewComment.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCard;
    const prevPopupComponent = this._popup;

    this._filmCard = new FilmCardComponent(this._film);
    this._filmControls = new FilmCardControls(this._film);

    this._filmCard.setShowPopupClickHandler(this._renderPopup);
    this._filmControls.setInWatchlistClickHandler(this._handleToWatchlist);
    this._filmControls.setInHistoryClickHandler(this._handleToHistory);
    this._filmControls.setInFavoritesClickHandler(this._handleToFavorites);

    observer.addObserver(this._destroyPopup);

    if (prevFilmComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCard, prevFilmComponent);
      this._renderFilmControls();
    }
    if (prevPopupComponent && document.contains(prevPopupComponent.getElement())) {
      this._renderPopup();
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  _renderFilmCard() {
    this._renderFilmControls();
    renderElement(this._container, this._filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilmControls() {
    renderElement(this._filmCard, this._filmControls, RenderPosition.BEFOREEND);
  }

  _renderPopup() {
    observer._notify(this._destroyPopup);
    this._popup = new FilmDetailsView(this._film);

    this._popup.setInWatchlistClickHandler(this._handleToWatchlist);
    this._popup.setInWatchedClickHandler(this._handleToHistory);
    this._popup.setInFavoritesClickHandler(this._handleToFavorites);
    this._popup.setOnDeleteCommentClick(this._handleDeleteCommentClick);
    this._popup.setSubmitNewComment(this._handleSubmitNewComment);

    this._body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscClosePopup);
    renderElement(this._body, this._popup, RenderPosition.BEFOREEND);

    this._popup.setCloseDetailsClickHandler(this._destroyPopup);
    //this._popup.reset();
  }

  _destroyPopup() {
    if (this._popup) {
      remove(this._popup);
    }
    this._body.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._onEscClosePopup);
  }

  _onEscClosePopup(evt) {
    if (evt.code === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._destroyPopup();
    }
  }

  _handleToWatchlist() {
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.WATCHLIST ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isInWatchlist: !this._film.isInWatchlist,
        },
      ),
    );
  }

  _handleToHistory() {
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.HISTORY ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isInHistory: !this._film.isInHistory,
        },
      ),
    );
  }

  _handleToFavorites() {
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.FAVORITES ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          isInFavorites: !this._film.isInFavorites,
        },
      ),
    );
  }

  _handleDeleteCommentClick(card) {
    this._changeData(
      UserActions.UPDATE_FILM,
      UpdateType.PATCH,
      card,
    );
  }

  _handleSubmitNewComment(card) {
    this._changeData(
      UserActions.UPDATE_FILM,
      UpdateType.PATCH,
      card,
    );
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmControls);
    remove(this._popup);
  }

}
