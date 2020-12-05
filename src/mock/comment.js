import { returnRandomItem } from "../utils/returnRandomItem";
import { generateLoremIpsum } from "../utils/generateLoremIpsum";
import { getRandomInteger } from "../utils/getRandomInteger";
import dayjs from "dayjs";

const EMOJI = [`angry`, `puke`, `sleeping`, `smile`];
const NAMES = [
  "Tim Macoveev",
  `John Doe`,
  `Jane Doe`,
  `Вася Пупкин`,
  `Alan Smithee`,
];

const generateDate = () => {
  const UNIT = [`hour`, `day`, `week`, `month`, `quarter`, `year`];
  const selectedUnit = generateLoremIpsum[UNIT];
  const gap = getRandomInteger(0, 5);

  return dayjs().subtract(gap, selectedUnit).toDate();
};

export const generateComment = () => {
  return {
    author: returnRandomItem(NAMES),
    date: generateDate(),
    emoji: returnRandomItem(EMOJI),
    message: generateLoremIpsum(),
  };
};
