const COMMENTS_COUNTER_STEP = 5;

const getInitialCommentCounterState = (count = 0) => {
  let initialCommentCounterState = count;
  initialCommentCounterState += COMMENTS_COUNTER_STEP;
  return initialCommentCounterState;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeEventListener = (whereRemoveEventListener, eventType, handlerEventFunction) => {
  const element = whereRemoveEventListener;
  element.removeEventListener(eventType, handlerEventFunction);

};

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {
  isEscapeKey,
  removeEventListener,
  COMMENTS_COUNTER_STEP,
  getInitialCommentCounterState,
  getRandomPositiveInteger,
  debounce
};
