import {
  isEscapeKey,
  removeEventListener
} from './util.js';

import {resetSlider} from './effects.js';

const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const fileUploader = imgUpload.querySelector('#upload-file');
const uploadCancel = imgUpload.querySelector('#upload-cancel');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textDescription = imgUpload.querySelector('.text__description');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const conditionForRemoveEventListener = !body.classList.contains('modal-open');


const modalClose = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const modalEscapeClose = (evt, eventType, handlerEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
    removeEventListener(conditionForRemoveEventListener, document, eventType, handlerEventFunction);
  }
};

const handlerEventUploadImg = (evt) => {
  switch (evt.type) {
    case 'click':
      modalClose();
      removeEventListener(conditionForRemoveEventListener, uploadCancel, 'click', handlerEventUploadImg);
      fileUploader.value = '';
      break;
    case 'keydown':
      modalEscapeClose(evt, 'keydown', handlerEventUploadImg);
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
  uploadCancel.addEventListener('click', handlerEventUploadImg);
  document.addEventListener('keydown', handlerEventUploadImg);
  imgUploadPreview.style.transform=`scale(${1})`;
  imgUploadEffectLevel.classList.add('hidden');
  scaleControlValue.value = `${100}%`;
  resetSlider();
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
