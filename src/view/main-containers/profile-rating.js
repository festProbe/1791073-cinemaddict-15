import { Rating } from '../../utils/constants';
import Smart from '../smart';

const createProfileRatingTemplate = (state) => {
  const { watchedMovies } = state;
  const getRank = () => {
    if (watchedMovies >= Rating.Novice.minWatchedMoviesRange && watchedMovies < Rating.Novice.maxWatchedMoviesRange) {
      return `<p class="profile__rating">${Rating.Novice.name}</p>`;
    }
    if (watchedMovies >= Rating.Fun.minWatchedMoviesRange && watchedMovies <= Rating.Fun.maxWatchedMoviesRange) {
      return `<p class="profile__rating">${Rating.Fun.name}</p>`;
    }
    if (watchedMovies >= Rating.MovieBuff.minWatchedMoviesRange) {
      return `<p class="profile__rating">${Rating.MovieBuff.name}</p>`;
    }
    return '';
  };
  return `<section class="header__profile profile">
  ${getRank()}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class ProfileRating extends Smart {
  constructor(watchedMovies) {
    super();
    this._state = { watchedMovies };
    this.resetWatchedMovieCount = this.resetWatchedMovieCount.bind(this);
  }

  getTemplate() {
    return createProfileRatingTemplate(this._state);
  }

  resetWatchedMovieCount(updatedMovieCount) {
    this.updateState({ updatedMovieCount });
  }
}
