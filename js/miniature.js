import {createArrPhotoContentData} from './data.js';
import {renderbigPicture} from './big-picture.js';

const userPicture = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

createArrPhotoContentData().forEach(({url, likes, comments, description}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.addEventListener('click', () => renderbigPicture({url, likes, comments, description}));
  pictureFragment.appendChild(pictureElement);
});

userPicture.appendChild(pictureFragment);
