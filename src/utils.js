export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const returnRandomItem = (array) => {
  const randomIndex = getRandomInteger(0, array.length - 1);
  return array[randomIndex];
};

const LOREM_SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

export const generateLoremIpsum = () => {
  const numberOfSentences = getRandomInteger(1, 5);
  let lorem = ``;
  for (let index = 0; index < numberOfSentences; index++) {
    lorem += returnRandomItem(LOREM_SENTENCES);
  }
  return lorem;
};

export const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

export const capitalize = (string) => {
  if (typeof string !== "string") return "";
  return string[0].toUpperCase() + string.slice(1);
};
