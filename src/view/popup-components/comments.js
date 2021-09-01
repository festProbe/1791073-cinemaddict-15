import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import AbstractComponent from '../abstract-component';

dayjs.extend(relativeTime);

const createCommentElement = (comment) => {
  let currentDate = comment.mailingDate;
  if (dayjs().diff(comment.mailingDate) > 2) {
    currentDate = dayjs(comment.mailingDate).fromNow();
  }
  return `<li class="film-details__comment">
    <span span class="film-details__comment-emoji">
     <img src="${comment.emoji}" width="55" height="55" alt="emoji-sleeping">
    </span>
    <div>
     <p class="film-details__comment-text">${comment.text}</p>
     <p class="film-details__comment-info">
       <span class="film-details__comment-author">${comment.author}</span>
       <span class="film-details__comment-day">${currentDate}</span>
       <button class="film-details__comment-delete">Delete</button>
     </p>
    </div>
    </li>`;
};


export default class Comment extends AbstractComponent {
  constructor(comment) {
    super();
    this._comment = comment;
  }

  getTemplate() { return createCommentElement(this._comment); }

  removeElement() {
    this.getElement().remove();
    this._element = null;
  }
}
