import AbstractDefault from './abstract-component';

export default class Smart extends AbstractDefault {
  constructor() {
    super();
    this._data = {};
  }

  _restoreHandlers() {

  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;
    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);
    this._restoreHandlers();
  }

  udpateData(update) {
    if (!update) {
      return;
    }

    this._data = Object.assign(
      {},
      this._data,
      update,
    );

    this.updateElement();
  }
}
