import AbstractComponent from '../abstract-default';

const createfilmsContainerTemplate = () => '<section class="films"></section>';

export default class FilmContainer extends AbstractComponent {
  getTemplate() {
    return createfilmsContainerTemplate();
  }
}
