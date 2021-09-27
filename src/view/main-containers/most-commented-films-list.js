import AbstractComponent from '../abstract-default';

const createMostCommentedFilmsListTemplate = () => (
  `<section class="films-list films-list--extra films-list--most-commented">
      <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class MostCommentedFilmsList extends AbstractComponent{
  getTemplate() {
    return createMostCommentedFilmsListTemplate();
  }
}
