import AbstractComponent from '../abstract-default';

const createTopRatedFilmsListTemplate = () => (
  `<section class="films-list films-list--extra films-list--top-rated">
    <h2 class="films-list__title">Top rated</h2>
    </div>
  </section>`
);

export default class TopRatedFilmsList extends AbstractComponent{
  getTemplate() {
    return createTopRatedFilmsListTemplate();
  }
}
