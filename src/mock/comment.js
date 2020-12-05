import { returnRandomItem } from "../utils/returnRandomItem";
import { generateLoremIpsum } from "../utils/generateLoremIpsum";
import { getRandomInteger } from "../utils/getRandomInteger";
import { EMOJI } from "../const";
import dayjs from "dayjs";

const NAMES = [
  "Tim Macoveev",
  `John Doe`,
  `Jane Doe`,
  `Вася Пупкин`,
  `Alan Smithee`,
];

const generateDate = () => {
  const UNIT = [`hour`, `day`, `week`, `month`, `quarter`, `year`];
  const selectedUnit = returnRandomItem(UNIT);
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
