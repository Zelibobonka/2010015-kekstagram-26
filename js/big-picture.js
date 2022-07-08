import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialComments = bigPicture.querySelector('.social__comments');

bigPictureCancel.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
  }
});

const createSocialCommentsTemplate = (comment) => (
  `<li class="social__comment">
    <img class="social__picture"
      src="${comment.avatar}"
      alt="${comment.name}"
      width="35" height="35">
    <p class="social__text">${comment.message}</p>
</li>`
);

const renderSocialComents = (comments) => {
  socialComments.innerHTML = '';

  comments.forEach((comment) => {
    socialComments.insertAdjacentHTML('beforeend', createSocialCommentsTemplate(comment));
  });
};

const renderbigPicture = (({url, likes, comments, description}) => {
  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.classList.remove('hidden');

  document.querySelector('.social__comment-count').classList.add('hidden');
  document.querySelector('.comments-loader').classList.add('hidden');
  body.classList.add('modal-open');

  renderSocialComents(comments);
});

export {renderbigPicture};
