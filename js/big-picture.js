import {
  isEscapeKey,
  removeEventListener
} from './util.js';

import {
  uploadMoreComments,
  clearCommentMarkupCounterState,
  handlerSocialComments,
  addEventListenerSocialCommentsLoader
} from './upload_more_comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const conditionForRemoveEventListener = !body.classList.contains('modal-open');

const modalClose = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const modalEscapeClose = (evt, eventType, handlerEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
    removeEventListener(conditionForRemoveEventListener, document, eventType, handlerEventFunction);
  }
};

const handlerEventBigPicture = (evt) => {
  switch (evt.type) {
    case 'click':
      modalClose();
      removeEventListener(conditionForRemoveEventListener, bigPictureCancel, 'click', handlerEventBigPicture);
      removeEventListener(conditionForRemoveEventListener, document, 'keydown', handlerEventBigPicture);
      removeEventListener(conditionForRemoveEventListener, socialCommentsLoader, 'click', handlerSocialComments);
      clearCommentMarkupCounterState();
      break;
    case 'keydown':
      modalEscapeClose(evt, 'keydown', handlerEventBigPicture);
      removeEventListener(conditionForRemoveEventListener, socialCommentsLoader, 'click', handlerSocialComments);
      clearCommentMarkupCounterState();
      break;
    default:
      modalClose();
      break;
  }
};

const createSocialCommentsTemplate = (comment) => (
  `<li class="social__comment">
    <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
);

const renderSocialComments = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    socialComments.insertAdjacentHTML('beforeend', createSocialCommentsTemplate(comment));
  });
};

const renderBigPicture = ((url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');
  socialCommentsLoader.classList.remove('hidden');

  bigPictureCancel.addEventListener('click', handlerEventBigPicture);
  document.addEventListener('keydown', handlerEventBigPicture);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  body.classList.add('modal-open');

  renderSocialComments(comments);
  uploadMoreComments();
  addEventListenerSocialCommentsLoader();
});

export {renderBigPicture};
