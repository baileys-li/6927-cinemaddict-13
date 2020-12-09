import {createElement} from "../utils";

const createShowMore = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createShowMore();
  }

  getElement() {
    return this._element ? this._element : createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
