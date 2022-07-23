
const imgUpload = document.querySelector('.img-upload');
const scaleControlSmaller = imgUpload.querySelector('.scale__control--smaller');
const scaleControlValue = imgUpload.querySelector('.scale__control--value');
const scaleControlBigger = imgUpload.querySelector('.scale__control--bigger');
const imgUploadPreview = imgUpload.querySelector('.img-upload__preview img');

scaleControlBigger.addEventListener('click', ()=> {
  let maxValue = parseInt(scaleControlValue.value, 10) + 25;
  if (maxValue > 100) {
    maxValue = 100;
  }
  imgUploadPreview.style.transform=`scale(${maxValue/100})`;
  scaleControlValue.value = `${maxValue}%`;
});

scaleControlSmaller.addEventListener('click', ()=> {
  let minValue = parseInt(scaleControlValue.value, 10) - 25;
  if (minValue < 25) {
    minValue = 25;
  }
  imgUploadPreview.style.transform=`scale(${minValue/100})`;
  scaleControlValue.value = `${minValue}%`;
});
