import { FiltersType } from '../../utils/constants';
import AbstractDefault from '../abstract-component';

const getFrase = (filter) => {
  switch (filter) {
    case FiltersType.ALL:
      return 'our database';
    case FiltersType.WATCHLIST:
      return FiltersType.WATCHLIST;
    case FiltersType.HISTORY:
      return FiltersType.HISTORY;
    case FiltersType.FAVORITES:
      return FiltersType.FAVORITES;
  }
};

const createEmptyFilmListTemplate = (filter) => (
  `<section class="films-list">
    <h2 class="films-list__title">There are no movies in ${getFrase(filter)}.</h2>
  </section>`
);

export default class EmptyFilmList extends AbstractDefault {
  constructor(currentFilter) {
    super();
    this._currentFilter = currentFilter;
  }

  getTemplate() {
    return createEmptyFilmListTemplate(this._currentFilter);
  }
}
