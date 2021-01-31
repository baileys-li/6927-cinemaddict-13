import AbstractView from "./_abstract";

export const createFilmsList = (headline, isExtra, isEmpty) => {
  const sectionExtraClass = isExtra ? `films-list--extra` : ``;
  const headlineExtraClass = isExtra || isEmpty ? `` : `visually-hidden`;
  const listContainer = isEmpty ? `` : `<div class="films-list__container"></div>`;

  return `<section class="films-list ${sectionExtraClass}">
  <h2 class="films-list__title ${headlineExtraClass}">${headline}</h2>
  ${listContainer}
</section>`;
};

export default class FilmsList extends AbstractView {
  constructor(list) {
    super();
    this._headline = list.headline;
    this._isExtra = list.isExtra;
    this._id = list.id;
    this._isEmpty = list.isEmpty;
  }

  getTemplate() {
    return createFilmsList(this._headline, this._isExtra, this._isEmpty);
  }
}
