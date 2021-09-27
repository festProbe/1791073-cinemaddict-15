import AbstractDefault from '../abstract-default';

const createLoadingTemplate = () => '<h2 class="films-list__title">Loading...</h2>';

export default class Loading extends AbstractDefault {
  getTemplate() {
    return createLoadingTemplate();
  }
}
