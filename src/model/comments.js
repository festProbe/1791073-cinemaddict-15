import AbstractObserver from '../utils/abstract-observer';

export default class CommentsModel extends AbstractObserver {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(comments) {
    this._comments = comments.slice();
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    this._comments = update.comments;

    this._notify(updateType);
  }

  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => comment.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    this._comments = [
      ...this._films.slice(0, index),
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType);
  }
}
