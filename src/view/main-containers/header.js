import AbstractComponent from '../abstract-component';

const createProfileRatingTemplate = (watchedMovies) => {
  const getRank = function () {
    if (watchedMovies > 0 && watchedMovies < 11) {
      return '<p class="profile__rating">Novice</p>';
    }
    if (watchedMovies >= 11 && watchedMovies < 21) {
      return '<p class="profile__rating">Fun</p>';
    }
    if (watchedMovies >= 21) {
      return '<p class="profile__rating">Movie Buff</p>';
    }
    return '';
  };
  return `<section class="header__profile profile">
  ${getRank()}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class ProfileRating extends AbstractComponent {
  constructor(watchedMovies) {
    super();
    this._watchMovies = watchedMovies;
  }

  getTemplate() {
    return createProfileRatingTemplate(this._watchMovies);
  }
}
