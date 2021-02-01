import AbstractView from "./_abstract";
import { SortType } from "../const";

const createSortFilters = (sortType) => {
  return `<ul class="sort">
  <li>
    <a href="#" class="sort__button ${sortType === SortType.DEFAULT ? `sort__button--active` : ``}" data-sort-type="${SortType.DEFAULT}">
      Sort by default
    </a>
  </li>
  <li>
    <a href="#" class="sort__button ${sortType === SortType.DATE ? `sort__button--active` : ``}" data-sort-type="${SortType.DATE}">
      Sort by date
    </a>
  </li>
  <li>
    <a href="#" class="sort__button ${sortType === SortType.RATING ? `sort__button--active` : ``}" data-sort-type="${SortType.RATING}">
      Sort by rating
    </a>
  </li>
</ul>`;
};
export default class SortFilters extends AbstractView {
  constructor(sortType) {
    super();
    this._sortType = sortType
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }
  getTemplate() {
    return createSortFilters(this._sortType);
  }
  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
