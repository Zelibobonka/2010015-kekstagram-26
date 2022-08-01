import { sendData } from './api.js';
import { showMessageSuccess, showMessageError } from './message.js';

const uploadImg = document.querySelector('.img-upload');
const form = uploadImg.querySelector('#upload-select-image');
const inputHashtag = uploadImg.querySelector('.text__hashtags');
const submitButton = uploadImg.querySelector('.img-upload__submit');

const isHashtagValidRegex = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

const setPristineSetting = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

const getArrHashtags = (value) => value.split(' ');

const isHashtagValid = (value) => isHashtagValidRegex.test(value);

const areHashtagValid = (value) => {
  const arrHashtags = getArrHashtags(value);
  if (value.length === 0 && arrHashtags.length === 1) {
    return true;
  }
  return arrHashtags.every((hashtag) => isHashtagValid(hashtag));
};

setPristineSetting.addValidator(inputHashtag, areHashtagValid,
  'Проблема синтаксиса'
);

const isHashtagsCountValid = (value) => {
  const arrHashtags = getArrHashtags(value);
  return (arrHashtags.length <= 5);
};

setPristineSetting.addValidator(inputHashtag, isHashtagsCountValid,
  'Количество хештегов - не более пяти'
);

const isHashtagsUnique = (value) => {
  const arrHashtags = getArrHashtags(value);
  const getLowercaseHashtag = arrHashtags.map((hashtag) => hashtag.toLowerCase());
  const set = new Set(getLowercaseHashtag);

  return (set.size === getLowercaseHashtag.length);
};

setPristineSetting.addValidator(inputHashtag, isHashtagsUnique,
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

    const isValid = setPristineSetting.validate();
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
