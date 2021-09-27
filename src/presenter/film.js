import FilmCardComponent from '../view/film-card-components/film-card';
import FilmCardControls from '../view/film-card-components/film-card-controls';
import FilmDetailsView from '../view/film-card-components/film-details';
import { renderElement, RenderPosition, replace, remove } from '../utils/render';
import { FiltersType, UpdateType, UserActions } from '../utils/constants';
import { isOnline } from '../utils/common';
//import AbstractObserver from '../utils/abstract-observer';

//const observer = new AbstractObserver();

export default class FilmCard {
  constructor(container, changeData, currentFilterType, api, resetPopups) {
    this._container = container;
    this._changeData = changeData;
    this._currentFilterType = currentFilterType;
    this._api = api;
    this._resetPopups = resetPopups;

    this._body = document.querySelector('body');

    this._filmCard = null;
    this._filmControls = null;
    this._popup = null;
    this._film = null;

    this._renderPopup = this._renderPopup.bind(this);
    this.resetPopup = this.resetPopup.bind(this);
    this._onEscClosePopup = this._onEscClosePopup.bind(this);
    this._handleToWatchlist = this._handleToWatchlist.bind(this);
    this._handleToHistory = this._handleToHistory.bind(this);
    this._handleToFavorites = this._handleToFavorites.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleToSubmitNewComment = this._handleToSubmitNewComment.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmCard;

    this._filmCard = new FilmCardComponent(this._film);
    this._filmControls = new FilmCardControls(this._film);

    this._filmCard.setShowPopupClickHandler(this._renderPopup);
    this._filmControls.setInWatchlistClickHandler(this._handleToWatchlist);
    this._filmControls.setInHistoryClickHandler(this._handleToHistory);
    this._filmControls.setInFavoritesClickHandler(this._handleToFavorites);

    //observer.addObserver(this._destroyPopup);

    if (prevFilmComponent === null) {
      this._renderFilmCard();
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCard, prevFilmComponent);
      this._renderFilmControls();
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmControls);
    remove(this._popup);
  }

  resetPopup() {
    remove(this._popup);
    if (this._body.classList.contains('hide-overflow')) {
      this._body.classList.remove('hide-overflow');
    }
    document.removeEventListener('keydown', this._onEscClosePopup);
  }

  _renderFilmCard() {
    this._renderFilmControls();
    renderElement(this._container, this._filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilmControls() {
    renderElement(this._filmCard, this._filmControls, RenderPosition.BEFOREEND);
  }

  _renderPopup() {
    this._resetPopups();
    if (isOnline()) {
      this._api.getComments(this._film)
        .then(() => {
          this._popup = new FilmDetailsView(this._film);
          this._popup.setInWatchlistClickHandler(this._handleToWatchlist);
          this._popup.setInWatchedClickHandler(this._handleToHistory);
          this._popup.setInFavoritesClickHandler(this._handleToFavorites);
          this._popup.setOnDeleteCommentClick(this._handleDeleteCommentClick);
          this._popup.setSubmitNewComment(this._handleToSubmitNewComment);

          this._body.classList.add('hide-overflow');
          document.addEventListener('keydown', this._onEscClosePopup);
          renderElement(this._body, this._popup, RenderPosition.BEFOREEND);

          this._popup.setCloseDetailsClickHandler(this.resetPopup);
        })
        .catch(() => {
          throw new Error('Невозможно загрузить комментарии, попробуйте позже.');
        });
      return;
    }

    this._popup = new FilmDetailsView(this._film);
    this._popup.setInWatchlistClickHandler(this._handleToWatchlist);
    this._popup.setInWatchedClickHandler(this._handleToHistory);
    this._popup.setInFavoritesClickHandler(this._handleToFavorites);
    this._popup.setOnDeleteCommentClick(this._handleDeleteCommentClick);
    this._popup.setSubmitNewComment(this._handleToSubmitNewComment);

    this._body.classList.add('hide-overflow');
    document.addEventListener('keydown', this._onEscClosePopup);
    renderElement(this._body, this._popup, RenderPosition.BEFOREEND);

    this._popup.setCloseDetailsClickHandler(this.resetPopup);
  }

  _onEscClosePopup(evt) {
    if (evt.code === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.resetPopup();
    }
  }

  _handleDeleteCommentClick(comment, readyHandler) {
    this._changeData(
      UserActions.DELETE_COMMENT,
      UpdateType.PATCH,
      this._film,
      comment,
      readyHandler,
    );
  }

  _handleToSubmitNewComment(comment, readyHandler) {
    this._changeData(
      UserActions.ADD_COMMENT,
      UpdateType.PATCH,
      this._film,
      comment,
      readyHandler,
    );
  }

  _handleToWatchlist(changePopup) {
    const userDetails = Object.assign({}, this._film.userDetails, { isWatchlist: !this._film.userDetails.isWatchlist });
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.WATCHLIST ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign({}, this._film, { userDetails }),
      userDetails,
      changePopup);
  }

  _handleToHistory(changePopup) {
    const userDetails = Object.assign({}, this._film.userDetails, { isAlreadyWatched: !this._film.userDetails.isAlreadyWatched });
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.HISTORY ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign({}, this._film, { userDetails }),
      userDetails,
      changePopup);
  }

  _handleToFavorites(changePopup) {
    const userDetails = Object.assign({}, this._film.userDetails, { isFavorite: !this._film.userDetails.isFavorite });
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.FAVORITES ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign({}, this._film, { userDetails }),
      userDetails,
      changePopup);
  }
}
