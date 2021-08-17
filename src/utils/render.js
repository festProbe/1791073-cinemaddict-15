import AbstractComponent from '../view/abstract-component';

export const RenderPosition = {
  AFTEREEND: 'afterend',
  BEFOREEND: 'beforeend',
};

export const renderElement = (container, child, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }

  switch (place) {
    case RenderPosition.AFTEREEND:
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

