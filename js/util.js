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

export {
  isEscapeKey,
  removeEventListener,
  COMMENTS_COUNTER_STEP,
  getInitialCommentCounterState
};
