import {createArrPhotoContentData} from './data.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
// bigPicture.classList.remove('hidden');
bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});
document.addEventListener('keydown', (evt) => {
  if (evt.key ==='Escape') {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

if(!bigPicture.classList.contains('hidden')) {
  body.classList.add('modal-open');
}

const bigPictureImg = bigPicture.querySelector('.big-picture__img')
  .querySelector('img');
const likesCount = bigPicture.querySelector('.big-picture__social')
  .querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count')
  .querySelector('.comments-count');
const socialPicture = bigPicture.querySelectorAll('.social__comment .social__picture');
const socialText = bigPicture.querySelectorAll('.social__comment .social__text');
const socialCaption = bigPicture.querySelector('.big-picture__social')
  .querySelector('.social__caption');

createArrPhotoContentData().forEach(({url, likes, comments, description}) => {
  bigPictureImg.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  socialPicture.forEach((element) => {
    element.src = comments[0].avatar;
    element.alt = comments[0].name;
  });
  socialText.forEach((element) => {
    element.textContent = comments[0].message;
  });
  socialCaption.textContent = description;
});

const socialCommentsCount = bigPicture.querySelector('.social__comment-count');
socialCommentsCount.classList.add('hidden');

const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsLoader.classList.add('hidden');
