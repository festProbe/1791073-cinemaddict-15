import { createElement } from '../utils/utils';

const createMostCommentedFilmsListTemplate = () => (
  `<section class="films-list films-list--extra films-list--most-commented">
      <h2 class="films-list__title">Most commented</h2>
      <div class="films-list__container"></div>
  </section>`
);

export default class MostCommentedFilmList{
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }

  getElement() {
    if (!this._element){
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
