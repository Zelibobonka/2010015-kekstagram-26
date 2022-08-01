import { COMMENTS_COUNTER_STEP, getInitialCommentCounterState } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

let initialCommentCounterState = getInitialCommentCounterState(0);
const commentCounterStep = COMMENTS_COUNTER_STEP;

const getCommentsData = () => {
  const socialComments = Array.from(bigPicture.querySelectorAll('.social__comment'));
  return socialComments;
};

const getHiddenCommentsData = () => {
  const socialHiddenComments = Array.from(bigPicture.querySelectorAll('.social__comment.hidden'));
  return socialHiddenComments;
};

const createSocialCommentsCounterTemplate = (initCommentCounterStep) => (
  `${initCommentCounterStep} из <span class="comments-count"> ${getCommentsData().length} </span> комментариев`
);

const clearCommentMarkupCounterState = () => {
  socialCommentCount.innerHTML = createSocialCommentsCounterTemplate(commentCounterStep);
};

const hiddenSocialCommentsLoader = () => {
  socialCommentsLoader.classList.add('hidden');
  initialCommentCounterState = getInitialCommentCounterState(0);
};

const handlerSocialComments = () => {
  const arrSocialComments = getCommentsData();
  const showFollowingComments = arrSocialComments.slice(initialCommentCounterState, initialCommentCounterState + commentCounterStep);
  showFollowingComments.forEach((elem) => elem.classList.remove('hidden'));

  initialCommentCounterState += commentCounterStep;

  socialCommentCount.innerHTML = createSocialCommentsCounterTemplate(arrSocialComments.length - getHiddenCommentsData().length);

  if (initialCommentCounterState === arrSocialComments.length || initialCommentCounterState > arrSocialComments.length) {
    hiddenSocialCommentsLoader();
  }
};

const uploadMoreComments = () => {
  const arrSocialComments = getCommentsData();
  if (((getCommentsData().length < commentCounterStep) || (getCommentsData().length === commentCounterStep)) && (getHiddenCommentsData().length === 0)) {
    socialCommentCount.innerHTML = createSocialCommentsCounterTemplate(getCommentsData().length);
    hiddenSocialCommentsLoader();
    return;
  }
  arrSocialComments
    .slice(commentCounterStep)
    .forEach((elem) => elem.classList.add('hidden'));

  initialCommentCounterState = getInitialCommentCounterState(0);
};

const addEventListenerSocialCommentsLoader = () => {
  socialCommentsLoader.addEventListener('click', handlerSocialComments);
};

export {
  uploadMoreComments,
  clearCommentMarkupCounterState,
  handlerSocialComments,
  addEventListenerSocialCommentsLoader
};
