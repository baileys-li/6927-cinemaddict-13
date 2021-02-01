import {
  generateLoremIpsum,
  returnRandomItem,
  getRandomInteger,
  getRandomBoolean
} from "../utils/random";
import {generateComment} from "./comment";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

const MOVIE_TITLES = [
  `The Dance of Life`,
  `Sagebrush Trail`,
  `The Man with the Golden Arm`,
  `Santa Claus Conquers the Martians`,
  `Popeye the Sailor Meets Sindbad the Sailor`,
  `The Great Flamarion`,
  `Made for Each Other`,
];

const MOVIE_POSTERS = [
  `popeye-meets-sinbad.png`,
  `sagebrush-trail.jpg`,
  `santa-claus-conquers-the-martians.jpg`,
  `the-dance-of-life.jpg`,
  `the-great-flamarion.jpg`,
  `the-man-with-the-golden-arm.jpg`,
];

const generateComments = () => {
  const commentsCount = getRandomInteger(0, 5);
  return Array(commentsCount).fill().map(generateComment);
};

export const generateMovie = () => {
  return {
    id: generateId(),
    title: returnRandomItem(MOVIE_TITLES),
    poster: returnRandomItem(MOVIE_POSTERS),
    description: generateLoremIpsum(),
    comments: generateComments(),
    rating: getRandomInteger(0, 100) / 10,
    year: getRandomInteger(1920, 2020),

    isInWatchlist: getRandomBoolean(),
    isWatched: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
  };
};
