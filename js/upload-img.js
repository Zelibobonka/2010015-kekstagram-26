import { isEscapeKey, removeEventListener } from './util.js';
import { onEffectChange, resetSlider } from './effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

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
  uploadEffects.forEach((element) => { element.checked = element.value === 'none'; });
  imgUploadPreview.style.filter = 'none';
  textHashtags.value = '';
  textDescription.value = '';
};

const closeModal = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeModalByEscape = (evt, eventType, handlerEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    removeEventListener(document, eventType, handlerEventFunction);
  }
};
const handleEventTextInput = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const handleEventUploadImg = (evt) => {
  switch (evt.type) {
    case 'click':
      closeModal();
      removeEventListener(uploadCancel, 'click', handleEventUploadImg);
      removeEventListener(document, 'keydown', handleEventUploadImg);
      uploadEffects.forEach((element) => {
        removeEventListener(element, 'change', onEffectChange);
      });
      removeEventListener(textHashtags, 'keydown', handleEventTextInput);
      removeEventListener(textDescription, 'keydown', handleEventTextInput);
      resetUploadImgFormData();
      break;
    case 'keydown':
      if (!isEscapeKey(evt)) {
        return;
      }
      closeModalByEscape(evt, 'keydown', handleEventUploadImg);
      removeEventListener(uploadCancel, 'click', handleEventUploadImg);
      uploadEffects.forEach((element) => {
        removeEventListener(element, 'change', onEffectChange);
      });
      removeEventListener(textHashtags, 'keydown', handleEventTextInput);
      removeEventListener(textDescription, 'keydown', handleEventTextInput);
      resetUploadImgFormData();
      break;
    default:
      closeModal();
      break;
  }
};

const handleUploadImg = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const file = fileUploader.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }

  initialStateUploadImgFormData();

  uploadCancel.addEventListener('click', handleEventUploadImg);
  document.addEventListener('keydown', handleEventUploadImg);
  uploadEffects.forEach((element) => {
    element.addEventListener('change', onEffectChange);
  });

  textHashtags.addEventListener('keydown', handleEventTextInput);
  textDescription.addEventListener('keydown', handleEventTextInput);
};

fileUploader.addEventListener('change', handleUploadImg);

export {
  closeModal,
  resetUploadImgFormData
};
