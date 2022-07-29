import './upload-img.js';
import './upload-validation.js';
import './scale-upload-img.js';
import './effects.js';
import './message.js';
import {modalClose} from './upload-img.js';
import {setUserFormSubmit} from './upload-validation.js';
import {renderArrPhotoContentData} from './miniature.js';
import {getData} from './api.js';

getData((photo) => {
  renderArrPhotoContentData(photo);
});

setUserFormSubmit(modalClose);
