import {renderArrPhotoContentData} from './miniature.js';
import {getRandomPositiveInteger, debounce} from './util.js';


const RANDOM_QUANTITY = 10;

const imgFilters = document.querySelector('.img-filters');
const filterDefault = imgFilters.querySelector('#filter-default');
const filterRandom = imgFilters.querySelector('#filter-random');
const filterDiscussed = imgFilters.querySelector('#filter-discussed');

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
    const randomId = getRandomPositiveInteger(0, newArray.length- 1);
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
  imgFilters.classList.remove('img-filters--inactive');
  filterDefault.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === filterDefault) {
      filterDefault.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDefaultFilter(pictures));
  }));

  filterRandom.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === filterRandom) {
      filterRandom.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createRandomFilter(pictures));
  }));

  filterDiscussed.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === filterDiscussed) {
      filterDiscussed.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDiscussedFilter(pictures));
  }));
};

export {showFilteredPictures};
