import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { transformDuration } from '../../utils/common';
import { Emotions, POPUP_ACTIVE_CONTROL_BUTTON_CLASS } from '../../utils/constants';
import he from 'he';
import SmartView from '../smart';
import { nanoid } from 'nanoid';

dayjs.extend(relativeTime);

const createGenreItems = (genres) => genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');

const createCommentElement = (comments) => {
  let template = '';
  comments.forEach((comment) => template += `<li class="film-details__comment" id="${comment.id}">
  <span span class="film-details__comment-emoji">
   <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-sleeping">
  </span>
  <div>
   <p class="film-details__comment-text">${comment.comment}</p>
   <p class="film-details__comment-info">
     <span class="film-details__comment-author">${comment.author}</span>
     <span class="film-details__comment-day">${dayjs().diff(comment.date) > 2 ? dayjs(comment.date).fromNow() : comment.date}</span>
     <button class="film-details__comment-delete">Delete</button>
   </p>
  </div>
  </li>`);
  return template;
};

const createPopupControlsTemplate = (state) => {
  const { isWatchlist, isAlreadyWatched, isFavorite } = state.userDetails;
  return `<section class="film-details__controls">
    <button type="button" class="${isWatchlist ? POPUP_ACTIVE_CONTROL_BUTTON_CLASS : ''} film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
    <button type="button" class="${isAlreadyWatched ? POPUP_ACTIVE_CONTROL_BUTTON_CLASS : ''} film-details__control-button film-details__control-button--watched" id="watched" name="watched">Already watched</button>
    <button type="button" class="${isFavorite ? POPUP_ACTIVE_CONTROL_BUTTON_CLASS : ''} film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
  </section>`;
};

const createEmojiElement = () => {
  let template = '';

  Emotions.forEach((emotion) => template += `<input class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emotion}"
    value="${emotion}">
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji ${emotion}">
    </label>`);
  return template;
};


const createPopupTemplate = (state) => {
  const pickedEmoji = state.emotion ? `<img src="./images/emoji/${state.emotion}.png" width="55" height="55" alt="${state.emotion}">` : '';
  const { poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, runTime, genre, description } = state.filmInfo;
  const { date, releaseCountry } = state.filmInfo.release;

  return `<section class="film-details" id="${state.id}">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./${poster}" alt="">
          <p class="film-details__age">${ageRating}+</p>
        </div>
        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${alternativeTitle}</p>
            </div>
            <div class="film-details__rating">
              <p class="film-details__total-rating">${totalRating}</p>
            </div>
          </div>
          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${transformDuration(runTime)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
            <td class="film-details__term">${genre.length > 1 ? 'Genres' : 'Genre'}</td>
            <td class="film-details__cell">
              ${createGenreItems(genre)}
            </td>
          </tr>
          </table>
          <p class="film-details__film-description">${description}</p>
        </div>
      </div>
      ${createPopupControlsTemplate(state)}
    </div>
    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments
          <span class="film-details__comments-count">${state.comments.length}</span>
        </h3>
        <ul class="film-details__comments-list">${createCommentElement(state.comments)}</ul>
        <div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">
            ${pickedEmoji}
          </div>
          <label class="film-details__comment-label">
            <textarea
              class="film-details__comment-input"
              placeholder="Select reaction below and write comment here"
              name="comment">${state.commentText ? state.commentText : ''}</textarea>
          </label>
          <div class="film-details__emoji-list">
            ${createEmojiElement()}
          </div>
        </div>
      </section>
    </div>
  </form>
</section>`;
};

export default class FilmDetails extends SmartView {
  constructor(film) {
    super();
    this._state = FilmDetails.parseFilmToData(film);

    this._inWatchListHandler = this._inWatchListHandler.bind(this);
    this._inWatchedHandler = this._inWatchedHandler.bind(this);
    this._inFavoritesHandler = this._inFavoritesHandler.bind(this);
    this._closeDetailsClickHandler = this._closeDetailsClickHandler.bind(this);

    this._emotionClickHandler = this._emotionClickHandler.bind(this);
    this._commentTextAreaHandler = this._commentTextAreaHandler.bind(this);
    this._onDeleteCommentClick = this._onDeleteCommentClick.bind(this);
    this._onSubmitEnterNewComment = this._onSubmitEnterNewComment.bind(this);

    this.setInnerHandlers();

    this._scrollPosition = 0;
  }

  getTemplate() { return createPopupTemplate(this._state); }

  _inWatchListHandler(evt) {
    evt.preventDefault();
    const scrollTopPosition = this.getElement().scrollTop;
    this._callback.inWatchlistClick();
    document.querySelector('.film-details').scrollTop = scrollTopPosition;
  }

  _inWatchedHandler(evt) {
    evt.preventDefault();
    const scrollTopPosition = this.getElement().scrollTop;
    this._callback.inWatchedClick();
    document.querySelector('.film-details').scrollTop = scrollTopPosition;
  }

  _inFavoritesHandler(evt) {
    evt.preventDefault();
    const scrollTopPosition = this.getElement().scrollTop;
    this._callback.inFavoritesClick();
    document.querySelector('.film-details').scrollTop = scrollTopPosition;
  }

  setInWatchlistClickHandler(callback) {
    this._callback.inWatchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._inWatchListHandler);
  }

  setInWatchedClickHandler(callback) {
    this._callback.inWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._inWatchedHandler);
  }

  setInFavoritesClickHandler(callback) {
    this._callback.inFavoritesClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._inFavoritesHandler);
  }

  _closeDetailsClickHandler() {
    this._callback.toCloseClick();
  }

  setCloseDetailsClickHandler(callback) {
    this._callback.toCloseClick = callback;
    const closeBtn = this.getElement().querySelector('.film-details__close-btn');

    closeBtn.addEventListener('click', this._closeDetailsClickHandler);
  }

  _emotionClickHandler(evt) {
    evt.preventDefault();
    this._scrollPosition = this.getElement().scrollTop;

    this.updateState({ emotion: evt.target.value });
    this.getElement().scrollTop = this._scrollPosition;

    const emojiItems = this.getElement().querySelectorAll('.film-details__emoji-item');

    [...emojiItems].find((it) => it.value === evt.target.value).setAttribute('checked', 'true');
  }

  _commentTextAreaHandler(evt) {
    this.updateState({ commentText: he.encode(evt.target.value) }, true);
  }

  _onSubmitEnterNewComment(evt) {
    if (evt.key === 'Enter' && evt.ctrlKey) {
      this._state = this._createNewComment();
      const scrollTopPosition = this.getElement().scrollTop;

      this._callback.onSubmitNewComment(this._state);

      document.querySelector('.film-details').scrollTop = scrollTopPosition;
    }
  }

  _createNewComment() {
    if (!this._state.commentText) {
      throw new Error('Нельзя отправить пустой комментарий !');
    }
    if (!this._state.emotion) {
      throw new Error('Пожалуйста, выберите эмоцию !');
    }

    const newComment = {
      id: nanoid(),
      emoji: `./images/emoji/${this._state.emotion}.png`,
      text: this._state.commentText,
      author: 'Vasya',
      mailingDate: dayjs(),
    };

    this._state.comments.push(newComment);

    this._state.commentText = null;
    this._state.emotion = null;

    return this._state;
  }

  _onDeleteCommentClick(evt) {
    evt.preventDefault();
    const scrollTopPosition = this.getElement().scrollTop;

    const targetId = evt.target.closest('.film-details__comment').id;

    this._state.comments = this._state.comments.filter((comment) => comment.id !== targetId);

    this._callback.onDeleteClick(FilmDetails.parseDataToFilm(this._state));

    document.querySelector('.film-details').scrollTop = scrollTopPosition;
  }

  setOnDeleteCommentClick(callback) {
    this._callback.onDeleteClick = callback;
    this.getElement().querySelectorAll('.film-details__comment-delete')
      .forEach((button) => button.addEventListener('click', this._onDeleteCommentClick));
  }

  setSubmitNewComment(callback) {
    this._callback.onSubmitNewComment = callback;
    this.getElement().querySelector('.film-details__comment-input')
      .addEventListener('keydown', this._onSubmitEnterNewComment);
  }

  setInnerHandlers() {
    const emoji = this.getElement().querySelectorAll('.film-details__emoji-item');
    const textarea = this.getElement().querySelector('.film-details__comment-input');

    emoji.forEach((emotion) => emotion.addEventListener('click', this._emotionClickHandler));
    textarea.addEventListener('input', this._commentTextAreaHandler);
  }

  restoreHandlers() {
    this.setInnerHandlers();

    this.setCloseDetailsClickHandler(this._callback.toCloseClick);

    this.setInWatchlistClickHandler(this._callback.watchListClick);
    this.setInWatchedClickHandler(this._callback.watchedClick);
    this.setInFavoritesClickHandler(this._callback.favoriteClick);

    this.setOnDeleteCommentClick(this._callback.onDeleteClick);
    this.setSubmitNewComment(this._callback.onSubmitNewComment);
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        emotion: null,
        commentText: null,
      },
    );
  }

  static parseDataToFilm(state) {
    state = Object.assign({}, state);

    if (!state.emotion) {
      state.emotion = null;
    }
    if (!state.commentText) {
      state.commentText = null;
    }

    delete state.emotion;
    delete state.commentText;

    return state;
  }

  reset(film) {
    this.updateState(
      FilmDetails.parseFilmToData(film),
    );
  }
}
