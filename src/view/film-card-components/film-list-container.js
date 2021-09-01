import AbstractDefault from '../abstract-component';

const filmListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmListContainer extends AbstractDefault {
  getTemplate() {
    return filmListContainerTemplate();
  }
}
