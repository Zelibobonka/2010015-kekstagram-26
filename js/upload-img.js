import {
  isEscapeKey,
  removeEventListener
} from './util.js';
import {
  onEffectChange,
  resetSlider
} from './effects.js';
const body = document.querySelector('body');
const imgUpload = document.querySelector('.img-upload');
const imgUploadOverlay = imgUpload.querySelector('.img-upload__overlay');
const fileUploader = imgUpload.querySelector('#upload-file');
const uploadCancel = imgUpload.querySelector('#upload-cancel');
const textHashtags = imgUpload.querySelector('.text__hashtags');
const textDescription = imgUpload.querySelector('.text__description');
const conditionForRemoveEventListener = !body.classList.contains('modal-open');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const uploadEffects = imgUpload.querySelectorAll('.effects__item .effects__radio'); //

const resetUploadImgFormData = () => {
  resetSlider();
  fileUploader.value = '';
  imgUploadPreview.style.filter = 'none';
  imgUploadPreview.style.transform = 'scale(1)';
  imgUploadEffectLevel.classList.add('hidden');
  scaleControlValue.value = '100%';
  textHashtags.value = '';
  textDescription.value = '';
  uploadEffects.forEach((element) => {
    if (element.value === 'none') {
      element.checked = true;
    } else {
      element.checked = false;
    }
  });
};

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
      removeEventListener(conditionForRemoveEventListener, document, 'keydown', handlerEventUploadImg);
      uploadEffects.forEach((element) => {
        removeEventListener(conditionForRemoveEventListener, element, 'change', onEffectChange);
      });
      break;
    case 'keydown':
      if (!isEscapeKey(evt)) {
        return;
      }
      modalEscapeClose(evt, 'keydown', handlerEventUploadImg);
      removeEventListener(conditionForRemoveEventListener, uploadCancel, 'click', handlerEventUploadImg);
      uploadEffects.forEach((element) => {
        removeEventListener(conditionForRemoveEventListener, element, 'change', onEffectChange);
      });
      break;
    default:
      modalClose();
      break;
  }
};

fileUploader.addEventListener('change', () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  resetUploadImgFormData();

  uploadCancel.addEventListener('click', handlerEventUploadImg);
  document.addEventListener('keydown', handlerEventUploadImg);
  uploadEffects.forEach((element) => {
    element.addEventListener('change', onEffectChange);
  });
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

export {
  resetUploadImgFormData
};
