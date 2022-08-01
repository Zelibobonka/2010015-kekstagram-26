import { sendData } from './api.js';
import { showMessageSuccess, showMessageError } from './message.js';

const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('#upload-select-image');
const hashtagText = imgUpload.querySelector('.text__hashtags');
const submitButton = imgUpload.querySelector('.img-upload__submit');

const isHashtagValidRegex = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

const getArrHashtags = (value) => value.split(' ');

const isHashtagValid = (value) => isHashtagValidRegex.test(value);

const areHashtagsValid = (value) => {
  const hashtags = getArrHashtags(value);
  if (value.length === 0 && hashtags.length === 1) {
    return true;
  }
  return hashtags.every((hashtag) => isHashtagValid(hashtag));
};

pristine.addValidator(hashtagText, areHashtagsValid,
  'Проблема синтаксиса'
);

const isHashtagsCountValid = (value) => {
  const hashtags = getArrHashtags(value);
  return (hashtags.length <= 5);
};

pristine.addValidator(hashtagText, isHashtagsCountValid,
  'Количество хештегов - не более пяти'
);

const isHashtagsUnique = (value) => {
  const hashtags = getArrHashtags(value);
  const lowercaseHashtag = hashtags.map((hashtag) => hashtag.toLowerCase());
  const set = new Set(lowercaseHashtag);

  return (set.size === lowercaseHashtag.length);
};

pristine.addValidator(hashtagText, isHashtagsUnique,
  'Каждый хэштег должен быть уникальным'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Сохраняю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Отправить';
};

const setUserFormSubmit = (onSuccessModalAction, onErrorModalAction) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccessModalAction();
          showMessageSuccess();
          unblockSubmitButton();
        },
        () => {
          onErrorModalAction();
          showMessageError();
          unblockSubmitButton();
        },
        new FormData(evt.target)
      );
    }
  });
};

export {
  setUserFormSubmit
};
