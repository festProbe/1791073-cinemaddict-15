import AbstractComponent from '../abstract-default';

const createFilmsCountTemplate = (filmsCount) => `<p>${filmsCount} movies inside</p`;

export default class FilmsStat extends AbstractComponent {
  constructor(filmsCount) {
    super();
    this._filmsCount = filmsCount;
  }

  getTemplate() {
    return createFilmsCountTemplate(this._filmsCount);
  }
}
