import dayjs from 'dayjs';
import { getRandomInteger } from '../utils/common';
import { nanoid } from 'nanoid';

const MAX_COMMENT_DAY_GAP = 7;

const Comment = {
  _EMOJI: [
    'angry.png',
    'puke.png',
    'sleeping.png',
    'smile.png',
  ],

  _COMMENT_TEXT: [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ',
  ],

  _AUTHOR_NAME: [
    'Morgan Freeman',
    'Brad Pitt',
    'Leonardo DiCaprio',
    'Robert De Niro',
    'Michael Caine',
    'Matt Damon',
    'Christian Bale',
    'Tom Hanks',
    'Gary Oldman',
    'Al Pacino',
    'Bruce Willis',
    'Harrison Ford',
  ],

  getId() { return nanoid(); },
  getEmoji() { return this._EMOJI[getRandomInteger(0, this._EMOJI.length - 1)]; },
  getCommentText() { return this._COMMENT_TEXT[getRandomInteger(0, this._COMMENT_TEXT.length - 1)]; },
  getAuthorName() { return this._AUTHOR_NAME[getRandomInteger(0, this._AUTHOR_NAME.length - 1)]; },
  getMailigDate() {
    const daysGap = getRandomInteger(-MAX_COMMENT_DAY_GAP, 0);
    const dueDate = `${dayjs().add(daysGap, 'day').format('YYYY-MM-DD hh:MM')}`;
    return dueDate;
  },
};

export const generateComment = () => {
  const comment = {
    id: Comment.getId(),
    emoji: `./images/emoji/${Comment.getEmoji()}`,
    text: Comment.getCommentText(),
    author: Comment.getAuthorName(),
    mailingDate: Comment.getMailigDate(),
  };
  return comment;
};

