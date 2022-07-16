import {
  isEscapeKey,
  removeEventListener
} from './util.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const fileUploader = imgUpload.querySelector('#upload-file');
const uploadCancel = imgUpload.querySelector('#upload-cancel');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textDescription = imgUpload.querySelector('.text__description');
const conditionForRemoveEventListener = !body.classList.contains('modal-open');


const modalClose = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const modalEscapeClose = (evt, eventType, handleEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
    removeEventListener(conditionForRemoveEventListener, document, eventType, handleEventFunction);
  }
};

const handleEvent = function (evt) {
  switch (evt.type) {
    case 'click':
      modalClose();
      removeEventListener(conditionForRemoveEventListener, uploadCancel, 'click', handleEvent);
      fileUploader.value = '';
      break;
    case 'keydown':
      modalEscapeClose(evt, 'keydown', handleEvent);
      fileUploader.value = '';
      break;
    default:
      modalClose();
      break;
  }
};

fileUploader.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancel.addEventListener('click', handleEvent);
  document.addEventListener('keydown', handleEvent);
});

textHashtags.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});

textDescription.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
});
