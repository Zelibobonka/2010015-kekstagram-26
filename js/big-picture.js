import {
  isEscapeKey,
  removeEventListener
} from './util.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCommentsLoader = bigPicture.querySelector('.social__comments-loader');
const conditionForRemoveEventListener = !body.classList.contains('modal-open');

const modalClose = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
};

const modalEscapeClose = (evt, eventType, handleEventFunction) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalClose();
    removeEventListener(conditionForRemoveEventListener, document, eventType, handleEventFunction);
  }
};

const handleEvent = function (evt) {
  switch (evt.type) {
    case 'click':
      modalClose();
      removeEventListener(conditionForRemoveEventListener, bigPictureCancel, 'click', handleEvent);
      break;
    case 'keydown':
      modalEscapeClose(evt, 'keydown', handleEvent);
      break;
    default:
      modalClose();
      break;
  }
};

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

const renderBigPicture = ((url, likes, comments, description) => {
  bigPicture.classList.remove('hidden');

  bigPictureCancel.addEventListener('click', handleEvent);
  document.addEventListener('keydown', handleEvent);

  bigPicture.querySelector('.big-picture__img').querySelector('img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  bigPicture.querySelector('.social__caption').textContent = description;

  body.classList.add('modal-open');

  renderSocialComents(comments);

  const arrSocialComments = Array.from(bigPicture.querySelectorAll('.social__comment'));
  const step = 5;
  let item = 0;

  arrSocialComments
    .slice(step)
    .forEach((elem) => elem.classList.add('hidden'));

  item += step;

  socialCommentsLoader.addEventListener('click', () => {
    const tmp = arrSocialComments.slice(item, item + step);
    tmp.forEach((e) => e.classList.remove('hidden'));
    item += step;
    const socialCommentCountHidden = Array.from(bigPicture.querySelectorAll('.social__comment.hidden'));
    socialCommentCount.innerHTML = `${arrSocialComments.length - socialCommentCountHidden.length} из <span class="comments-count">${comments.length}</span> комментариев`;

    if (item >= arrSocialComments.length) {
      socialCommentsLoader.classList.add('hidden');
    }
  });
});

export {renderBigPicture};
