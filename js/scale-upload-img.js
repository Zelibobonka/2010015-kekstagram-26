const uploadImg = document.querySelector('.img-upload');
const controlScaleSmall = uploadImg.querySelector('.scale__control--smaller');
const controlScaleValue = uploadImg.querySelector('.scale__control--value');
const controlScaleBig = uploadImg.querySelector('.scale__control--bigger');
const uploadImgPreview = uploadImg.querySelector('.img-upload__preview img');

controlScaleBig.addEventListener('click', () => {
  let maxScaleValue = parseInt(controlScaleValue.value, 10) + 25;
  if (maxScaleValue > 100) {
    maxScaleValue = 100;
  }
  uploadImgPreview.style.transform = `scale(${maxScaleValue/100})`;
  controlScaleValue.value = `${maxScaleValue}%`;
});

controlScaleSmall.addEventListener('click', () => {
  let minScaleValue = parseInt(controlScaleValue.value, 10) - 25;
  if (minScaleValue < 25) {
    minScaleValue = 25;
  }
  uploadImgPreview.style.transform = `scale(${minScaleValue/100})`;
  controlScaleValue.value = `${minScaleValue}%`;
});
