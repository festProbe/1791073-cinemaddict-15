import AbstractComponent from '../view/abstract-component';

export const RenderPosition = {
  AFTEREEND: 'afterend',
  BEFOREEND: 'beforeend',
  AFTERBEGIN: 'afterbegin',
};

export const renderElement = (container, child, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.before(child);
      break;
    case RenderPosition.BEFOREEND:
      container.append(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractComponent) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractComponent) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error('Can\'t replace unexisting elements');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if (component === null) {
    return;
  }
  if (!(component instanceof AbstractComponent)) {
    throw new Error('Can remove only components');
  }

  component.getElement().remove();
  component.removeElement();
};
