import { renderElement, RenderPosition } from '../utils/render';
import FilmDetailsView from '../view/popup-components/popup';
import PopupControls from '../view/popup-components/popup-controls';
import PopupComment from '../view/popup-components/comments';
import NewComment from '../view/popup-components/new-comment-component';
import { PopupModes } from '../utils/constants';

export default class FilmDetails {
  constructor(film, changeMode) {
    this._film = film;
    this._changeMode = changeMode;
    this._body = document.querySelector('body');

    this._handleEscKeydown = this._handleEscKeydown.bind(this);
    this._handleClosePopup = this._handleClosePopup.bind(this);
  }

  init() {
    this._popup = new FilmDetailsView(this._film);
    this._popupControls = new PopupControls(this._film);
    this._newCommentElement = new NewComment();
    this._mode = PopupModes.OPENED;
    this._renderPopup();
    document.addEventListener('keydown', this._handleEscKeydown);
    this._popup.setClickHandler(this._handleClosePopup);
  }

  resetView() {
    if (this._mode !== PopupModes.CLOSED) {
      this._mode = this._closePopup();
    }
  }

  _renderPopupControls() {
    const popupControlsContainer = this._popup.getElement().querySelector('.film-details__top-container');
    renderElement(popupControlsContainer, this._popupControls, RenderPosition.BEFOREEND);
  }

  _renderPopupComment(comment) {
    const commentElement = new PopupComment(comment);
    const commentsListContainer = this._popup.getElement().querySelector('.film-details__comments-list');
    renderElement(commentsListContainer, commentElement, RenderPosition.BEFOREEND);
  }

  _renderPopupComments() {
    this._film.comments
      .forEach((comment) => {
        this._renderPopupComment(comment);
      });
  }

  _renderPopupNewCommentBlock() {
    const commentsContainer = this._popup.getElement().querySelector('.film-details__comments-wrap');
    renderElement(commentsContainer, this._newCommentElement, RenderPosition.BEFOREEND);
  }

  _closePopup() {
    this._body.classList.remove('hide-overflow');
    this._popup.removeElement();
  }

  _handleClosePopup() {
    this._mode = PopupModes.CLOSED;
    this._closePopup();
  }

  _handleEscKeydown(evt) {
    if (evt.key === 'Esc' || evt.key === 'Escape') {
      evt.preventDefault();
      this._handleClosePopup();
    }
  }

  _renderPopup() {
    this._renderPopupControls();
    this._renderPopupComments();
    this._renderPopupNewCommentBlock();
    renderElement(this._body, this._popup, RenderPosition.BEFOREEND);
  }
}