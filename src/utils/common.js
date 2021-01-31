export const capitalize = (string) => {
  return typeof string === `string`
    ? string[0].toUpperCase() + string.slice(1)
    : ``;
};
