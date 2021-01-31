import AbstractView from "./_abstract";

const createShowMore = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};

export default class ShowMoreButton extends AbstractView {
  getTemplate() {
    return createShowMore();
  }
}
