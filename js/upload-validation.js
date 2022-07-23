const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('#upload-select-image');
const hashtagText = imgUpload.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

const getArrHashtags = (value) => value.split(' ');

const re = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

const isHashtagValid = (value) => re.test(value);

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

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const validForm = pristine.validate();
  if (!validForm) {
    return validForm;
  }
});
