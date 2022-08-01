const COUNT_COMMENT_STEP = 5;

const getCountInitialCommentState = (count = 0) => {
  let countInitialCommentState = count;
  countInitialCommentState += COUNT_COMMENT_STEP;
  return countInitialCommentState;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const removeEventListener = (removeEventListenerWhere, typeOfEvent, handleEventFunction) => {
  const element = removeEventListenerWhere;
  element.removeEventListener(typeOfEvent, handleEventFunction);

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
  COUNT_COMMENT_STEP,
  getCountInitialCommentState,
  getRandomPositiveInteger,
  debounce
};
