import {
  COMMENTS_COUNTER_STEP,
  getInitialCommentCounterState
} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

let initialCommentCounterState = getInitialCommentCounterState(0);

const getCommentsData = () => {
  const socialComment = Array.from(bigPicture.querySelectorAll('.social__comment'));
  return socialComment;
};

const clearCommentMarkupCounterState = () => {
  const commentsCount = getCommentsData();
  socialCommentCount.innerHTML = `${COMMENTS_COUNTER_STEP} из <span class="comments-count"> ${commentsCount.length} </span> комментариев`;
};


const handlerSocialComments = () => {
  const arrSocialComments = getCommentsData();
  const commentCounterStep = COMMENTS_COUNTER_STEP;

  const showFollowingComments = arrSocialComments.slice(initialCommentCounterState, initialCommentCounterState + commentCounterStep);
  showFollowingComments.forEach((elem) => elem.classList.remove('hidden'));

  initialCommentCounterState += commentCounterStep;

  const arrSocialCommentsHidden = Array.from(bigPicture.querySelectorAll('.social__comment.hidden'));
  socialCommentCount.innerHTML = `${arrSocialComments.length - arrSocialCommentsHidden.length} из <span class="comments-count">${arrSocialComments.length}</span> комментариев`;

  if (initialCommentCounterState === arrSocialComments.length) {
    socialCommentsLoader.classList.add('hidden');
    initialCommentCounterState = getInitialCommentCounterState(0);
  }
};

const uploadMoreComments = () => {
  const arrSocialComments = getCommentsData();
  const counterCommentsLoaderStep = COMMENTS_COUNTER_STEP;

  arrSocialComments
    .slice(counterCommentsLoaderStep)
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
  addEventListenerSocialCommentsLoader,
};
