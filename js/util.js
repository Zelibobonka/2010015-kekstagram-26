const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (arr) => arr[getRandomPositiveInteger(0, arr.length - 1)];

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeEventListener = (conditionForRemove, whereRemoveEventListener, eventType, handleEventFunction) => {
  if (conditionForRemove) {
    const element = whereRemoveEventListener;
    element.removeEventListener(eventType, handleEventFunction);
  }
};

export {
  getRandomPositiveInteger,
  getRandomArrayElement,
  isEscapeKey,
  removeEventListener
};
