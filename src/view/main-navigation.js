import {capitalize} from "../utils";

export const createMainNavigation = (filters) => {
  const filtersMarkup = filters
    .map((filter) => createFilterMarkup(filter))
    .join(``);

  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filtersMarkup}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

const createFilterMarkup = (filter) => {
  const {name, count} = filter;
  return `<a href="#${name}" class="main-navigation__item">${capitalize(name)} <span class="main-navigation__item-count">${count}</span></a>`;
};
