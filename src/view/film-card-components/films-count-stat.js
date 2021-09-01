import AbstractComponent from '../abstract-component';

const createFilmsCountTemplate = () => '<p>130 291 movies inside</p';

export default class FilmsStat extends AbstractComponent{
  getTemplate() {
    return createFilmsCountTemplate();
  }
}
