import {getRandomPositiveInteger} from './util.js';
import {getRandomArrayElement} from './util.js';

const photoDescriptions = [
  'На природе',
  'На море',
  'На улице',
  'На даче',
  'Работа не волк, работа - это ворк, волк - это ходить',
  'С друзьями',
];

const userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const userNames = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
];

const createArrPhotoContentData = () => {
  const photoContentData = [];

  for (let i=1; i<=25; i++) {
    const likes = getRandomPositiveInteger(15, 200);
    const randomAvatar = getRandomPositiveInteger(1, 6);

    photoContentData.push(
      {
        id: i,
        url: `photos/${i}.jpg`,
        description: getRandomArrayElement(photoDescriptions),
        likes: likes,
        comments: [
          {
            id: i + 1,
            avatar: `img/avatar-${randomAvatar}.svg`,
            message: getRandomArrayElement(userComments),
            name: getRandomArrayElement(userNames),
          },
        ],
      }
    );
  }
  return photoContentData;
};

export {createArrPhotoContentData};
