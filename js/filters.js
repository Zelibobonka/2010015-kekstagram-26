import { renderArrPhotoContentData } from './miniature.js';
import { getRandomPositiveInteger, debounce } from './util.js';

const RANDOM_QUANTITY = 10;

const imgFilter = document.querySelector('.img-filters');
const filterButtonDefault = imgFilter.querySelector('#filter-default');
const filterButtonRandom = imgFilter.querySelector('#filter-random');
const filterButtonDiscussed = imgFilter.querySelector('#filter-discussed');

const compareComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

const createDefaultFilter = (pictures) => pictures.slice();

const getRandomUniqueElements = (arr) => {
  const newArray = arr.slice();
  const elements = [];
  const newArrayLength = arr.length;
  for (let i = 0; i < newArrayLength; i++) {
    const randomId = getRandomPositiveInteger(0, newArray.length - 1);
    elements.push(newArray[randomId]);
    newArray.splice(randomId, 1);
  }
  return elements;
};

const createRandomFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return getRandomUniqueElements(picturesArray).slice(0, RANDOM_QUANTITY);
};

const createDiscussedFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return picturesArray.sort(compareComments);
};

const removeActiveClass = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

const clearPicturesContainer = () => {
  const picturesAll = document.querySelectorAll('.picture');
  picturesAll.forEach((picture) => {
    picture.remove();
  });
};

const renderPicturesFilter = (pictures) => {
  clearPicturesContainer();
  renderArrPhotoContentData(pictures);
};

const showFilteredPictures = (pictures) => {
  imgFilter.classList.remove('img-filters--inactive');
  filterButtonDefault.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === filterButtonDefault) {
      filterButtonDefault.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDefaultFilter(pictures));
  }));

  filterButtonRandom.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === filterButtonRandom) {
      filterButtonRandom.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createRandomFilter(pictures));
  }));

  filterButtonDiscussed.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === filterButtonDiscussed) {
      filterButtonDiscussed.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDiscussedFilter(pictures));
  }));
};

export {
  showFilteredPictures
};
