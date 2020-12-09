import {createElement} from "../utils";

export const createFooterStatistics = (count) => {
  return `<section class="footer__statistics">
  <p>${count} movies inside</p>
</section>`;
};


export default class FooterStatistics {
  constructor(count) {
    this._element = null;
    this._count = count;
  }

  getTemplate() {
    return createFooterStatistics(this._count);
  }

  getElement() {
    return this._element ? this._element : createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
