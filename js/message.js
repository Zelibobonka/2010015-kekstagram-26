import { isEscapeKey, removeEventListener } from './util.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const error = document.querySelector('.error');
const success = document.querySelector('.success');
const errorButton = document.querySelector('.error__button');
const successButton = document.querySelector('.success__button');

const openEditFormForResend = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
};

const closeMessages = () => {
  error.classList.add('hidden');
  success.classList.add('hidden');
};

const handlerCloseMessageError = () => {
  error.classList.add('hidden');
  openEditFormForResend();
};

const handlerCloseMessageSuccess = () => {
  success.classList.add('hidden');
};

const handlerEventMessage = (evt) => {
  switch (evt.type) {
    case 'click':
      if (error.classList.contains('hidden')) {
        if (evt.target.classList.contains('success__inner')) {
          return;
        }
        handlerCloseMessageSuccess();
        removeEventListener(successButton, 'click', handlerCloseMessageSuccess);
        removeEventListener(document, 'keydown', handlerEventMessage);
        removeEventListener(document, 'click', handlerEventMessage);
        return;
      }
      if (success.classList.contains('hidden')) {
        if (evt.target.classList.contains('error__inner')) {
          return;
        }
        handlerCloseMessageError();
        removeEventListener(errorButton, 'click', handlerCloseMessageError);
        removeEventListener(document, 'keydown', handlerEventMessage);
        removeEventListener(document, 'click', handlerEventMessage);
      }
      break;
    case 'keydown':
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        if (error.classList.contains('hidden')) {
          handlerCloseMessageSuccess();
          removeEventListener(successButton, 'click', handlerCloseMessageSuccess);
          removeEventListener(document, 'keydown', handlerEventMessage);
          removeEventListener(document, 'click', handlerEventMessage);
          return;
        }
        if (success.classList.contains('hidden')) {
          handlerCloseMessageError();
          removeEventListener(errorButton, 'click', handlerCloseMessageError);
          removeEventListener(document, 'keydown', handlerEventMessage);
          removeEventListener(document, 'click', handlerEventMessage);
        }
      }
      break;
    default:
      closeMessages();
      removeEventListener(successButton, 'click', handlerCloseMessageSuccess);
      removeEventListener(errorButton, 'click', handlerCloseMessageError);
      removeEventListener(document, 'keydown', handlerEventMessage);
      removeEventListener(document, 'click', handlerEventMessage);
      break;
  }
};

const showMessageError = () => {
  error.classList.remove('hidden');
  errorButton.addEventListener('click', handlerCloseMessageError);
  document.addEventListener('keydown', handlerEventMessage);
  document.addEventListener('click', handlerEventMessage);
};

const showMessageSuccess = () => {
  success.classList.remove('hidden');
  successButton.addEventListener('click', handlerCloseMessageSuccess);
  document.addEventListener('keydown', handlerEventMessage);
  document.addEventListener('click', handlerEventMessage);
};

const showMessageGetDataError = () => {
  document.querySelector('.img-upload__message--loading').classList.remove('hidden');
};

export {
  showMessageError,
  showMessageSuccess,
  showMessageGetDataError
};
