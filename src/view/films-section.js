import AbstractView from "./_abstract";

const createFilmsSection = () => {
  return `<section class="films">
</section>`;
};

export default class FilmsSection extends AbstractView {
  getTemplate() {
    return createFilmsSection();
  }
}
