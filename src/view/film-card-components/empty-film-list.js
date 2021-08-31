import AbstractDefault from '../abstract-component';

const createEmptyFilmListTemplate = () => (
  `<section class="films-list">
    <h2 class="films-list__title">All movies. Upcoming</h2>
  </section>`
);

export default class EmptyFilmList extends AbstractDefault {
  getTemplate() {
    return createEmptyFilmListTemplate();
  }
}
