import AbstractDefault from '../abstract-default';

const filmListContainerTemplate = () => '<div class="films-list__container"></div>';

export default class FilmListContainer extends AbstractDefault {
  getTemplate() {
    return filmListContainerTemplate();
  }
}
