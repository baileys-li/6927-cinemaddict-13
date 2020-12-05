import { getRandomInteger } from "./getRandomInteger";

export const returnRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);

  return array[randomIndex];
};
