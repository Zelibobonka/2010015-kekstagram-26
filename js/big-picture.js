import { isEscapeKey, removeEventListener } from './util.js';
import {
  uploadMoreComment,
  clearCommentMarkupCounterState,
  handleSocialComments,
  addEventListenerSocialCommentsLoader
} from './upload-more-comments.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const cancelBigPictureButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentList = bigPicture.querySelector('.social__comments');
const socialCommentLoaderButton = bigPicture.querySelector('.social__comments-loader');

const closeModal = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeModalByEscape = (evt, typeOfEvent, handleEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    removeEventListener(document, typeOfEvent, handleEventFunction);
  }
};

const handleEventBigPicture = (evt) => {
  switch (evt.type) {
    case 'click':
      closeModal();
      removeEventListener(cancelBigPictureButton, 'click', handleEventBigPicture);
      removeEventListener(document, 'keydown', handleEventBigPicture);
      removeEventListener(socialCommentLoaderButton, 'click', handleSocialComments);
      clearCommentMarkupCounterState();
      break;
    case 'keydown':
      closeModalByEscape(evt, 'keydown', handleEventBigPicture);
      removeEventListener(socialCommentLoaderButton, 'click', handleSocialComments);
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
  socialCommentList.textContent = '';

  comments.forEach((comment) => {
    socialCommentList.insertAdjacentHTML('beforeend', createSocialCommentsTemplate(comment));
  });
};

const renderBigPicture = ((url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');
  socialCommentLoaderButton.classList.remove('hidden');

  cancelBigPictureButton.addEventListener('click', handleEventBigPicture);
  document.addEventListener('keydown', handleEventBigPicture);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  body.classList.add('modal-open');

  renderSocialComments(comments);
  uploadMoreComment();
  addEventListenerSocialCommentsLoader();
});


export {
  renderBigPicture
};
