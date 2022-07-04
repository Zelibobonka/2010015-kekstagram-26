import {createArrPhotoContentData} from './data.js';

const userPicture = document.querySelector('.pictures');
const similarPictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const pictureFragment = document.createDocumentFragment();

createArrPhotoContentData().forEach(({url, likes, comments}) => {
  const pictureElement = similarPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  userPicture.append(pictureElement);
});

userPicture.append(pictureFragment);
