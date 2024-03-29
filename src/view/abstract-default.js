import { SHAKE_ANIMATION_TIMEOUT } from '../utils/constants';
import { createElement } from '../utils/render';

export default class AbstractDefault {
  constructor() {
    if (new.target === AbstractDefault) {
      throw new Error('Can\'t instantiate Abstract, only concrete one.');
    }

    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstract method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(element) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = '';
    }, SHAKE_ANIMATION_TIMEOUT);
  }

}
