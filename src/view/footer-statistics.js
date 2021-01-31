import AbstractView from "./_abstract";

export const createFooterStatistics = (count) => {
  return `<section class="footer__statistics">
  <p>${count} movies inside</p>
</section>`;
};


export default class FooterStatistics extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  getTemplate() {
    return createFooterStatistics(this._count);
  }
}
