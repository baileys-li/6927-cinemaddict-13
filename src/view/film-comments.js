import { createFilmComment } from "./film-comment";

export const createFilmComments = (count) => {
  let comments = ``;

  for (let index = 0; index < count; index++) {
    comments += createFilmComment();

  }
  return `<ul class="film-details__comments-list">${comments}</ul>`;
};
