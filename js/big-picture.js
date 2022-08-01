import { isEscapeKey, removeEventListener } from './util.js';
import {
  uploadMoreComments,
  clearCommentMarkupCounterState,
  handleSocialComments,
  addEventListenerSocialCommentsLoader
} from './upload-more-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const modalEscapeClose = (evt, eventType, handleEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    removeEventListener(document, eventType, handleEventFunction);
  }
};

const handleEventBigPicture = (evt) => {
  switch (evt.type) {
    case 'click':
      closeModal();
      removeEventListener(bigPictureCancel, 'click', handleEventBigPicture);
      removeEventListener(document, 'keydown', handleEventBigPicture);
      removeEventListener(socialCommentsLoader, 'click', handleSocialComments);
      clearCommentMarkupCounterState();
      break;
    case 'keydown':
      modalEscapeClose(evt, 'keydown', handleEventBigPicture);
      removeEventListener(socialCommentsLoader, 'click', handleSocialComments);
      clearCommentMarkupCounterState();
      break;
    default:
      closeModal();
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

  bigPictureCancel.addEventListener('click', handleEventBigPicture);
  document.addEventListener('keydown', handleEventBigPicture);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  body.classList.add('modal-open');

  renderSocialComments(comments);
  uploadMoreComments();
  addEventListenerSocialCommentsLoader();
});


export {
  renderBigPicture
};
