import {createElement} from "../utils";

const createFilmsSection = () => {
  return `<section class="films">
</section>`;
};

export default class FilmsSection{
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createFilmsSection();
  }

  getElement() {
    return this._element ? this._element : createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
