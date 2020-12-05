import { createHeaderProfile } from "./view/header-profile";
import { createMainNavigation } from "./view/main-navigation";
import { createSortFilters } from "./view/sort-filters";
import { createFilmsSection } from "./view/films-section";
import { createFilmsList } from "./view/films-list";
import { createFilmDetails } from "./view/film-details";
import { generateMovie } from "./mock/movie";
import { getRandomInteger } from "./utils/getRandomInteger";

import { createFooterStatistics } from "./view/footer-statistics";

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const body = document.body;
const siteHeaderElement = body.querySelector(`.header`);
render(siteHeaderElement, createHeaderProfile());

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainNavigation(), `afterbegin`);
render(siteMainElement, createSortFilters());
render(siteMainElement, createFilmsSection());

const MOVIE_COUNT = getRandomInteger(15, 20);

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);


const siteFilmSection = body.querySelector(`.films`);
const allMovies = {
  headline: `All movies. Upcoming`,
  isExtra: false,
  filmsNumber: 5,
};
const topMovies = {
  headline: `Top rated`,
  isExtra: true,
  filmsNumber: 2,
};
const mostCommentedMovies = {
  headline: `Most commented`,
  isExtra: true,
  filmsNumber: 2,
};

render(siteFilmSection, createFilmsList(allMovies));
render(siteFilmSection, createFilmsList(topMovies));
render(siteFilmSection, createFilmsList(mostCommentedMovies));

const films = siteFilmSection.querySelectorAll(`.film-card`);
films.forEach((film) => {
  film.style.cursor = `pointer`;
  film.addEventListener(`click`, () => {
    body.classList.add(`hide-overflow`);
    render(body, createFilmDetails());
  });
});

const siteFooterElement = body.querySelector(`.footer`);
render(siteFooterElement, createFooterStatistics());




