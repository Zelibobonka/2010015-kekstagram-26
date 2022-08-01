import { isEscapeKey, removeEventListener } from './util.js';
import { onChangeEffect , resetSlider } from './effects.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const uploadImg = document.querySelector('.img-upload');
const uploadImgOverlay = uploadImg.querySelector('.img-upload__overlay');
const uploadFile = uploadImg.querySelector('#upload-file');
const uploadCancelButton = uploadImg.querySelector('#upload-cancel');
const inputHashtag = uploadImg.querySelector('.text__hashtags');
const textDescription = uploadImg.querySelector('.text__description');
const uploadImgPreview = uploadImg.querySelector('.img-upload__preview img');
const uploadImgEffectLevel = uploadImg.querySelector('.img-upload__effect-level');
const controlScaleValue = uploadImg.querySelector('.scale__control--value');
const uploadImgEffects = uploadImg.querySelectorAll('.effects__item .effects__radio');

const initialStateUploadImgFormData = () => {
  uploadImgPreview.style.transform = 'scale(1)';
  uploadImgEffectLevel.classList.add('hidden');
  controlScaleValue.value = '100%';
};

const resetUploadImgFormData = () => {
  resetSlider();
  initialStateUploadImgFormData();
  uploadFile.value = '';
  uploadImgEffects.forEach((element) => {
    element.checked = element.value === 'none';
  });
  uploadImgPreview.style.filter = 'none';
  inputHashtag.value = '';
  textDescription.value = '';
};

const closeModal = () => {
  uploadImgOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
};

const closeModalByEscape = (evt, typeOfEvent, handleEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeModal();
    removeEventListener(document, typeOfEvent, handleEventFunction);
  }
};
const handleEventUploadImg = (evt) => {
  if (isEscapeKey(evt)) {
    evt.stopPropagation();
  }
};

const handlerEventUploadImg = (evt) => {
  switch (evt.type) {
    case 'click':
      closeModal();
      removeEventListener(uploadCancelButton, 'click', handlerEventUploadImg);
      removeEventListener(document, 'keydown', handlerEventUploadImg);
      uploadImgEffects.forEach((element) => {
        removeEventListener(element, 'change', onChangeEffect);
      });
      removeEventListener(inputHashtag, 'keydown', handleEventUploadImg);
      removeEventListener(textDescription, 'keydown', handleEventUploadImg);
      resetUploadImgFormData();
      break;
    case 'keydown':
      if (!isEscapeKey(evt)) {
        return;
      }
      closeModalByEscape(evt, 'keydown', handlerEventUploadImg);
      removeEventListener(uploadCancelButton, 'click', handlerEventUploadImg);
      uploadImgEffects.forEach((element) => {
        removeEventListener(element, 'change', onChangeEffect);
      });
      removeEventListener(inputHashtag, 'keydown', handleEventUploadImg);
      removeEventListener(textDescription, 'keydown', handleEventUploadImg);
      resetUploadImgFormData();
      break;
    default:
      closeModal();
      break;
  }
};

const handleUploadImg = () => {
  uploadImgOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    uploadImgPreview.src = URL.createObjectURL(file);
  }

  initialStateUploadImgFormData();

  uploadCancelButton.addEventListener('click', handlerEventUploadImg);
  document.addEventListener('keydown', handlerEventUploadImg);
  uploadImgEffects.forEach((element) => {
    element.addEventListener('change', onChangeEffect);
  });

  inputHashtag.addEventListener('keydown', handleEventUploadImg);
  textDescription.addEventListener('keydown', handleEventUploadImg);
};

uploadFile.addEventListener('change', handleUploadImg);

export {
  closeModal,
  resetUploadImgFormData
};
