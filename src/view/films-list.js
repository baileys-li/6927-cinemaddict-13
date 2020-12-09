import {createElement} from "../utils";

export const createFilmsList = (headline, isExtra) => {
  const sectionExtraClass = isExtra ? `films-list--extra` : ``;
  const headlineExtraClass = isExtra ? `` : `visually-hidden`;


  return `<section class="films-list ${sectionExtraClass}">
  <h2 class="films-list__title ${headlineExtraClass}">${headline}</h2>
  <div class="films-list__container">
  </div>
</section>`;
};


export default class FilmsList{
  constructor(list) {
    this._element = null;
    this._headline = list.headline;
    this._isExtra = list.isExtra;
    this._id = list.id
  }

  getTemplate() {
    return createFilmsList(this._headline, this._isExtra);
  }

  getElement() {
    return this._element ? this._element : createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
