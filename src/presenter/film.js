import FilmCardComponent from '../view/film-card-components/film-card';
import FilmCardControls from '../view/film-card-components/film-controls';
import FilmDetailsView from '../view/film-card-components/popup';
import { renderElement, RenderPosition, replace, remove } from '../utils/render';
import { FiltersType, UpdateType, UserActions } from '../utils/constants';
import AbstractObserver from '../utils/abstract-observer';
//import CommentsModel from '../model/comments';

const observer = new AbstractObserver();

export default class filmCard {
  constructor(container, changeData, currentFilterType, api) {
    this._container = container;
    this._changeData = changeData;
    this._currentFilterType = currentFilterType;
    this._api = api;

    this._body = document.querySelector('body');

    this._filmCard = null;
    this._filmControls = null;
    this._popup = null;
    //this._commentsModel = null;
    this._film = null;

    this._renderPopup = this._renderPopup.bind(this);
    this._destroyPopup = this._destroyPopup.bind(this);
    this._onEscClosePopup = this._onEscClosePopup.bind(this);
    this._handleToWatchlist = this._handleToWatchlist.bind(this);
    this._handleToHistory = this._handleToHistory.bind(this);
    this._handleToFavorites = this._handleToFavorites.bind(this);
    this._handleDeleteCommentClick = this._handleDeleteCommentClick.bind(this);
    this._handleToSubmitNewComment = this._handleToSubmitNewComment.bind(this);

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
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

    this._api.getComments(this._film)
      .then((comments) => {
        this._film.comments = comments;

        this._popup = new FilmDetailsView(this._film);
        this._popup.setInWatchlistClickHandler(this._handleToWatchlist);
        this._popup.setInWatchedClickHandler(this._handleToHistory);
        this._popup.setInFavoritesClickHandler(this._handleToFavorites);
        this._popup.setOnDeleteCommentClick(this._handleDeleteCommentClick);
        this._popup.setSubmitNewComment(this._handleToSubmitNewComment);

        this._body.classList.add('hide-overflow');
        document.addEventListener('keydown', this._onEscClosePopup);
        renderElement(this._body, this._popup, RenderPosition.BEFOREEND);

        this._popup.setCloseDetailsClickHandler(this._destroyPopup);
      })
      .catch(() => {
        throw new Error('Невозможно загрузить комментарии, попробуйте позже.');
      });
  }

  _deletingError(commentId) {
    for (const comment of this._films.comments) {
      if (comment.id === commentId) {
        comment.shake();
      }
    }
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

  _handleModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.UPDATE_COMMENTS:
        this._destroyPopup();
        this._renderPopup();
    }
  }

  _handleViewAction(commentActionType, comment, readyHandler, film) {
    switch (commentActionType) {
      case UserActions.ADD_COMMENT:
        this._api.addComment(film, comment)
          .then(({ comments }) => {
            readyHandler(comments);
          })
          .catch(() => {
            this._popup.shake(this._popup.getElement().querySelector('.film-details__new-comment'));
          });
        break;
      case UserActions.DELETE_COMMENT:
        this._api.deleteComment(comment).then(() => {
          readyHandler();
        })
          .catch(() => {
            this._popup.shake(this._popup.getElement().querySelector(`#${comment}`));
          });
        break;
    }
  }

  _handleDeleteCommentClick(comment, readyHandler) {
    this._handleViewAction(
      UserActions.DELETE_COMMENT,
      comment,
      readyHandler,
    );
  }

  _handleToSubmitNewComment(comment, readyHandler) {
    this._handleViewAction(
      UserActions.ADD_COMMENT,
      comment,
      readyHandler,
      this._film,
    );
  }

  _handleToWatchlist() {
    const userDetails = Object.assign({}, this._film.userDetails, { isWatchlist: !this._film.userDetails.isWatchlist });
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.WATCHLIST ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign({}, this._film, { userDetails }));
  }

  _handleToHistory() {
    const userDetails = Object.assign({}, this._film.userDetails, { isAlreadyWatched: !this._film.userDetails.isAlreadyWatched });
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.HISTORY ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign({}, this._film, { userDetails }));
  }

  _handleToFavorites() {
    const userDetails = Object.assign({}, this._film.userDetails, { isFavorite: !this._film.userDetails.isFavorite });
    this._changeData(
      UserActions.UPDATE_FILM,
      this._currentFilterType === FiltersType.FAVORITES ? UpdateType.MINOR : UpdateType.PATCH,
      Object.assign({}, this._film, { userDetails }));
  }

  destroy() {
    remove(this._filmCard);
    remove(this._filmControls);
    remove(this._popup);
  }
}
