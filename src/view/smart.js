import AbstractDefault from './abstract-component';

export default class Smart extends AbstractDefault {
  constructor() {
    super();
    this._state = {};
  }

  updateState (update, isNoReplace = false) {
    if (!update) {
      return;
    }

    this._state = Object.assign(
      {},
      this._state,
      update,
    );

    if (isNoReplace) {
      return;
    }

    this._updateElement();
  }

  _updateElement () {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this.restoreHandlers();
  }

  restoreHandler () {
  }
}
