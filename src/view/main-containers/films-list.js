import AbstractComponent from '../abstract-default';

const createFilmListTemplate = () => (
  `<section class="films-list">
  </section>`
);

export default class FilmList extends AbstractComponent{
  getTemplate() {
    return createFilmListTemplate();
  }
}
