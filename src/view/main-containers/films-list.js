import AbstractComponent from '../abstract-component';

const createFilmListTemplate = () => (
  `<section class="films-list">
  </section>`
);

export default class FilmList extends AbstractComponent{
  getTemplate() {
    return createFilmListTemplate();
  }
}
