const imgUpload = document.querySelector('.img-upload');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');
const imgUploadEffectLevel = imgUpload.querySelector('.img-upload__effect-level');
const effectLevel = imgUpload.querySelector('.effect-level__value');
const sliderElement = imgUpload.querySelector('.effect-level__slider');

noUiSlider.create(sliderElement, {
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
    imgUploadEffectLevel.classList.add('hidden');
  } else {
    imgUploadEffectLevel.classList.remove('hidden');
  }
};

const resetSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1,
  });
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
  imgUploadPreview.classList.add('effects__preview--none');
};

const onEffectChange = (evt) => {
  imgUploadPreview.classList.remove(`effects__preview--${currentEffect}`);
  currentEffect = evt.target.value;
  imgUploadPreview.classList.add(`effects__preview--${currentEffect}`);

  hideSlider();

  switch (currentEffect) {
    case 'none' || 'chrome' || 'sepia':
      resetSlider();
      break;
    case 'marvin':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 1,
      });
      break;
    case 'phobos':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
    case 'heat':
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        start: 3,
        step: 0.1,
      });
      break;
  }

  sliderElement.noUiSlider.on('update', () => {
    effectLevel.value = sliderElement.noUiSlider.get();

    switch (currentEffect) {
      case 'none':
        imgUploadPreview.style.filter = 'none';
        break;
      case 'chrome':
        imgUploadPreview.style.filter = `grayscale(${effectLevel.value})`;
        break;
      case 'sepia':
        imgUploadPreview.style.filter = `sepia(${effectLevel.value})`;
        break;
      case 'marvin':
        imgUploadPreview.style.filter = `invert(${effectLevel.value}%)`;
        break;
      case 'phobos':
        imgUploadPreview.style.filter = `blur(${effectLevel.value}px)`;
        break;
      case 'heat':
        imgUploadPreview.style.filter = `brightness(${effectLevel.value})`;
        break;
    }
  });
};

export {
  resetSlider,
  onEffectChange,
};
