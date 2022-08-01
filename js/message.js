import { isEscapeKey, removeEventListener } from './util.js';

const body = document.querySelector('body');
const uploadImg = document.querySelector('.img-upload');
const uploadImgOverlay = uploadImg.querySelector('.img-upload__overlay');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const errorButton = document.querySelector('.error__button');
const successButton = document.querySelector('.success__button');

const openEditFormForResend = () => {
  uploadImgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeMessages = () => {
  error.classList.add('hidden');
  success.classList.add('hidden');
};

const handleCloseMessageError = () => {
  error.classList.add('hidden');
  openEditFormForResend();
};

const handleCloseMessageSuccess = () => {
  success.classList.add('hidden');
};

const handleEventMessage = (evt) => {
  switch (evt.type) {
    case 'click':
      if (error.classList.contains('hidden')) {
        if (evt.target.classList.contains('success__inner')) {
          return;
        }
        handleCloseMessageSuccess();
        removeEventListener(successButton, 'click', handleCloseMessageSuccess);
        removeEventListener(document, 'keydown', handleEventMessage);
        removeEventListener(document, 'click', handleEventMessage);
        return;
      }
      if (success.classList.contains('hidden')) {
        if (evt.target.classList.contains('error__inner')) {
          return;
        }
        handleCloseMessageError();
        removeEventListener(errorButton, 'click', handleCloseMessageError);
        removeEventListener(document, 'keydown', handleEventMessage);
        removeEventListener(document, 'click', handleEventMessage);
      }
      break;
    case 'keydown':
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        if (error.classList.contains('hidden')) {
          handleCloseMessageSuccess();
          removeEventListener(successButton, 'click', handleCloseMessageSuccess);
          removeEventListener(document, 'keydown', handleEventMessage);
          removeEventListener(document, 'click', handleEventMessage);
          return;
        }
        if (success.classList.contains('hidden')) {
          handleCloseMessageError();
          removeEventListener(errorButton, 'click', handleCloseMessageError);
          removeEventListener(document, 'keydown', handleEventMessage);
          removeEventListener(document, 'click', handleEventMessage);
        }
      }
      break;
    default:
      closeMessages();
      removeEventListener(successButton, 'click', handleCloseMessageSuccess);
      removeEventListener(errorButton, 'click', handleCloseMessageError);
      removeEventListener(document, 'keydown', handleEventMessage);
      removeEventListener(document, 'click', handleEventMessage);
      break;
  }
};

const showMessageError = () => {
  error.classList.remove('hidden');
  errorButton.addEventListener('click', handleCloseMessageError);
  document.addEventListener('keydown', handleEventMessage);
  document.addEventListener('click', handleEventMessage);
};

const showMessageSuccess = () => {
  success.classList.remove('hidden');
  successButton.addEventListener('click', handleCloseMessageSuccess);
  document.addEventListener('keydown', handleEventMessage);
  document.addEventListener('click', handleEventMessage);
};

const showMessageGetDataError = () => {
  document.querySelector('.img-upload__message--loading').classList.remove('hidden');
};

export {
  showMessageError,
  showMessageSuccess,
  showMessageGetDataError
};
