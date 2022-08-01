const uploadImg = document.querySelector('.img-upload');
const uploadImgPreview = uploadImg.querySelector('.img-upload__preview img');
const uploadImgEffectLevel = uploadImg.querySelector('.img-upload__effect-level');
const effectLevel = uploadImg.querySelector('.effect-level__value');
const slideElement = uploadImg.querySelector('.effect-level__slider');

noUiSlider.create(slideElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

let currentEffect = document.querySelector('.effects__list input:checked').value;

const hideSlider = () => {
  if (currentEffect === 'none') {
    uploadImgEffectLevel.classList.add('hidden');
  } else {
    uploadImgEffectLevel.classList.remove('hidden');
  }
};

const resetSlider = () => {
  slideElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
  uploadImgPreview.classList.remove(`effects__preview--${currentEffect}`);
  uploadImgPreview.classList.add('effects__preview--none');
};

const onChangeEffect = (evt) => {
  uploadImgPreview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  uploadImgPreview.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  switch (currentEffect) {
    case 'none' || 'chrome' || 'sepia':
      resetSlider();
      break;
    case 'marvin':
      slideElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      slideElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      slideElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }

  slideElement.noUiSlider.on('update', () => {
    effectLevel.value = slideElement.noUiSlider.get();

    switch (currentEffect) {
      case 'none':
        uploadImgPreview.style.filter = 'none';
        break;
      case 'chrome':
        uploadImgPreview.style.filter = `grayscale(${effectLevel.value})`;
        break;
      case 'sepia':
        uploadImgPreview.style.filter = `sepia(${effectLevel.value})`;
        break;
      case 'marvin':
        uploadImgPreview.style.filter = `invert(${effectLevel.value}%)`;
        break;
      case 'phobos':
        uploadImgPreview.style.filter = `blur(${effectLevel.value}px)`;
        break;
      case 'heat':
        uploadImgPreview.style.filter = `brightness(${effectLevel.value})`;
        break;
    }
  });
};

export {
  resetSlider,
  onChangeEffect,
};
