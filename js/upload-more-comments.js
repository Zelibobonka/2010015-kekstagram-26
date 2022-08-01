import { COUNT_COMMENT_STEP, getCountInitialCommentState } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const countSocialComment = bigPicture.querySelector('.social__comment-count');
const socialCommentLoaderButton = bigPicture.querySelector('.social__comments-loader');

let countInitialCommentState = getCountInitialCommentState(0);
const countCommentStep = COUNT_COMMENT_STEP;

const getCommentsData = () => {
  const socialComments = Array.from(bigPicture.querySelectorAll('.social__comment'));
  return socialComments;
};

const getHiddenCommentsData = () => {
  const socialHiddenComments = Array.from(bigPicture.querySelectorAll('.social__comment.hidden'));
  return socialHiddenComments;
};

const createSocialCommentsCounterTemplate = (countInitCommentStep) => (
  `${countInitCommentStep} из <span class="comments-count"> ${getCommentsData().length} </span> комментариев`
);

const clearCommentMarkupCounterState = () => {
  countSocialComment.textContent = '';
  countSocialComment.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(countCommentStep));
};

const hideSocialCommentsLoader = () => {
  socialCommentLoaderButton.classList.add('hidden');
  countInitialCommentState = getCountInitialCommentState(0);
};

const handleSocialComments = () => {
  const arrSocialComments = getCommentsData();
  const showFollowComments = arrSocialComments.slice(countInitialCommentState, countInitialCommentState + countCommentStep);
  showFollowComments.forEach((element) => element.classList.remove('hidden'));

  countInitialCommentState += countCommentStep;

  countSocialComment.textContent = '';
  countSocialComment.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(arrSocialComments.length - getHiddenCommentsData().length));

  if (countInitialCommentState === arrSocialComments.length || countInitialCommentState > arrSocialComments.length) {
    hideSocialCommentsLoader();
  }
};

const uploadMoreComment = () => {
  const arrSocialComments = getCommentsData();
  if (((getCommentsData().length < countCommentStep) || (getCommentsData().length === countCommentStep)) && (getHiddenCommentsData().length === 0)) {
    countSocialComment.textContent = '';
    countSocialComment.insertAdjacentHTML('afterbegin', createSocialCommentsCounterTemplate(getCommentsData().length));
    hideSocialCommentsLoader();
    return;
  }
  arrSocialComments
    .slice(countCommentStep)
    .forEach((elem) => elem.classList.add('hidden'));

  countInitialCommentState = getCountInitialCommentState(0);
};

const addEventListenerSocialCommentsLoader = () => {
  socialCommentLoaderButton.addEventListener('click', handleSocialComments);
};

export {
  uploadMoreComment,
  clearCommentMarkupCounterState,
  handleSocialComments,
  addEventListenerSocialCommentsLoader
};
