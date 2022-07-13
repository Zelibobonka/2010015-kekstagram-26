const imgUpload = document.querySelector('.img-upload');
const form = imgUpload.querySelector('#upload-select-image');
const hashtagText = imgUpload.querySelector('.text__hashtags');

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, true);

const getArrHashtags = (value) => value.split(' ');

const re = /^#[A-Za-zА-яа-яЕё0-9]{1,19}$/;

const isHashtegValid = (value) => re.test(value);

const areHashtegsValid = (value) => {
  const hashtegs = getArrHashtags(value);

  return hashtegs.every((hashteg) => isHashtegValid(hashteg));
};

pristine.addValidator(hashtagText, areHashtegsValid,
  'Проблема синтаксиса'
);

const isHashtegsCountValid = (value) => {
  const hashtegs = getArrHashtags(value);

  return (hashtegs.length <= 5);
};

pristine.addValidator(hashtagText, isHashtegsCountValid,
  'Количество хештегов - не более пяти'
);

const isHashtegsUnique = (value) => {
  const hashtegs = getArrHashtags(value);
  const lowercaseHashteg = hashtegs.map((hashteg) => hashteg.toLowerCase());
  const set = new Set(lowercaseHashteg);

  return (set.size === lowercaseHashteg.length);
};

pristine.addValidator(hashtagText, isHashtegsUnique,
  'Каждый хэштег должен быть уникальным'
);

form.addEventListener('submit', (evt) => {
  const validForm = pristine.validate();
  if(validForm) {
    evt.preventDefault();
  }
});
