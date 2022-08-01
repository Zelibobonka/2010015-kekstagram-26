import { isEscapeKey, removeEventListener } from './util.js';
import { onEffectChange, resetSlider } from './effects.js';

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
const uploadEffects = imgUpload.querySelectorAll('.effects__item .effects__radio');

const initialStateUploadImgFormData = () => {
  imgUploadPreview.style.transform = 'scale(1)';
  imgUploadEffectLevel.classList.add('hidden');
  scaleControlValue.value = '100%';
};

const resetUploadImgFormData = () => {
  resetSlider();
  initialStateUploadImgFormData();
  fileUploader.value = '';
  uploadEffects.forEach((element) => {
    if (element.value === 'none') {
      element.checked = true;
    } else {
      element.checked = false;
    }
  });
  imgUploadPreview.style.filter = 'none';
  textHashtags.value = '';
  textDescription.value = '';
};

const modalClose = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const modalEscapeClose = (evt, eventType, handlerEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
    removeEventListener(document, eventType, handlerEventFunction);
  }
};
const handlerEventTextInput = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const handlerEventUploadImg = (evt) => {
  switch (evt.type) {
    case 'click':
      modalClose();
      removeEventListener(uploadCancel, 'click', handlerEventUploadImg);
      removeEventListener(document, 'keydown', handlerEventUploadImg);
      uploadEffects.forEach((element) => {
        removeEventListener(element, 'change', onEffectChange);
      });
      removeEventListener(textHashtags, 'keydown', handlerEventTextInput);
      removeEventListener(textDescription, 'keydown', handlerEventTextInput);
      resetUploadImgFormData();
      break;
    case 'keydown':
      if (!isEscapeKey(evt)) {
        return;
      }
      modalEscapeClose(evt, 'keydown', handlerEventUploadImg);
      removeEventListener(uploadCancel, 'click', handlerEventUploadImg);
      uploadEffects.forEach((element) => {
        removeEventListener(element, 'change', onEffectChange);
      });
      removeEventListener(textHashtags, 'keydown', handlerEventTextInput);
      removeEventListener(textDescription, 'keydown', handlerEventTextInput);
      resetUploadImgFormData();
      break;
    default:
      modalClose();
      break;
  }
};

const handlerUploadImg = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  initialStateUploadImgFormData();

  uploadCancel.addEventListener('click', handlerEventUploadImg);
  document.addEventListener('keydown', handlerEventUploadImg);
  uploadEffects.forEach((element) => {
    element.addEventListener('change', onEffectChange);
  });

  textHashtags.addEventListener('keydown', handlerEventTextInput);
  textDescription.addEventListener('keydown', handlerEventTextInput);
};

fileUploader.addEventListener('change', handlerUploadImg);

export {
  modalClose,
  resetUploadImgFormData
};
