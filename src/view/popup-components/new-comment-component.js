import { createElement, renderElement, RenderPosition } from '../../utils/render';
import Smart from '../smart';

const createNewCommentTemplate = () => `<div class="film-details__new-comment">
    <div class="film-details__add-emoji-label"></div>
    <label class="film-details__comment-label">
      <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
    </label>
    <div class="film-details__emoji-list">
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
    <label class="film-details__emoji-label" for="emoji-smile">
      <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
    </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
    <label class="film-details__emoji-label" for="emoji-sleeping">
      <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
    </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
    <label class="film-details__emoji-label" for="emoji-puke">
      <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
    </label>

  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
    <label class="film-details__emoji-label" for="emoji-angry">
      <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
    </label>
    </div>
  </div>`;

export default class NewComment extends Smart {
  constructor() {
    super();

    this._changeEmojiHandler = this._changeEmojiHandler.bind(this);

    this.getElement().querySelector('.film-details__emoji-list').addEventListener('change', this._changeEmojiHandler);
  }

  getTemplate() { return createNewCommentTemplate(); }

  _changeEmojiHandler(evt) {
    evt.preventDefault();
    if (this._emojiContainer !== undefined) {
      this._emojiContainer.removeChild(this._emojiContainer.querySelector('img'));
    }
    this._emojiContainer = this.getElement().querySelector('.film-details__add-emoji-label');
    const smileEmoji = '<img src="images/emoji/smile.png" width="55" height="55" alt="emoji-smile"></img>';
    const sleepingEmoji = '<img src="images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleepeng"></img>';
    const pukeEmoji = '<img src="images/emoji/puke.png" width="55" height="55" alt="emoji-puke"></img>';
    const angryEmoji = '<img src="images/emoji/angry.png" width="55" height="55" alt="emoji-angry"></img>';

    switch (evt.target.id) {
      case 'emoji-smile':
        renderElement(this._emojiContainer, createElement(smileEmoji), RenderPosition.BEFOREEND);
        break;
      case 'emoji-sleeping':
        renderElement(this._emojiContainer, createElement(sleepingEmoji), RenderPosition.BEFOREEND);
        break;
      case 'emoji-puke':
        renderElement(this._emojiContainer, createElement(pukeEmoji), RenderPosition.BEFOREEND);
        break;
      case 'emoji-angry':
        renderElement(this._emojiContainer, createElement(angryEmoji), RenderPosition.BEFOREEND);
        break;
    }
  }
}
