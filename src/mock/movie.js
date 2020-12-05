import { returnRandomItem } from "../utils/returnRandomItem";
import { generateLoremIpsum } from "../utils/generateLoremIpsum";
import { getRandomInteger } from "../utils/getRandomInteger";
import { generateComment } from "./comment";

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
  const numberOfComments = getRandomInteger(0, 5);
  let comments = [];
  for (let index = 0; index < numberOfComments; index++) {
    comments.push(generateComment());
  }
  return comments;
};

export const generateMovie = () => {
  return {
    title: returnRandomItem(MOVIE_TITLES),
    poster: returnRandomItem(MOVIE_POSTERS),
    descriptions: generateLoremIpsum(),
    comments: generateComments(),
  };
};
