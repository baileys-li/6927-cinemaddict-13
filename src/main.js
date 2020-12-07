import {createHeaderProfile} from "./view/header-profile";
import {createMainNavigation} from "./view/main-navigation";
import {createSortFilters} from "./view/sort-filters";
import {createFilmsSection} from "./view/films-section";
import {createFilmsList} from "./view/films-list";
import {createFilmDetails} from "./view/film-details";
import {createFooterStatistics} from "./view/footer-statistics";
import {createFilmCard} from "./view/film-card";

import {generateMovie} from "./mock/movie";
import {generateFilter} from "./mock/filters";

import {render} from "./utils";

const body = document.body;
const siteHeaderElement = body.querySelector(`.header`);
render(siteHeaderElement, createHeaderProfile());

const MOVIE_COUNT = 18;
const MOVIE_COUNT_PER_STEP = 5;

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createMainNavigation(filters), `afterbegin`);
render(siteMainElement, createSortFilters());
render(siteMainElement, createFilmsSection());

const siteFilmSection = body.querySelector(`.films`);
const allMovies = {
  headline: `All movies. Upcoming`,
  isExtra: false,
  filmsNumber: MOVIE_COUNT_PER_STEP,
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

render(siteFilmSection, createFilmsList(allMovies, movies));
render(siteFilmSection, createFilmsList(topMovies, movies));
render(siteFilmSection, createFilmsList(mostCommentedMovies, movies));

const showMoreBtn = siteFilmSection.querySelector(`.films-list__show-more`);
const allMoviesList = showMoreBtn.previousElementSibling;

showMoreBtn.addEventListener(`click`, (evt) => {
  evt.preventDefault();

  const currentMoviesCount = allMoviesList.childElementCount;

  let loopEnd = currentMoviesCount + MOVIE_COUNT_PER_STEP;

  if (loopEnd >= MOVIE_COUNT) {
    loopEnd = MOVIE_COUNT;
    showMoreBtn.remove();
  }
  for (let index = currentMoviesCount; index < loopEnd; index++) {
    render(allMoviesList, createFilmCard(movies[index]));
  }
});

const films = siteFilmSection.querySelectorAll(`.film-card`);
films.forEach((film) => {
  film.style.cursor = `pointer`;
  film.addEventListener(`click`, () => {
    body.classList.add(`hide-overflow`);
    render(body, createFilmDetails(movies[0]));
    const filmDetail = document.querySelector(`.film-details`);
    const closeButton = filmDetail.querySelector(`.film-details__close-btn`);

    closeButton.addEventListener(`click`, closePopup);

    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        closePopup();
      }
    });

    function closePopup() {
      filmDetail.remove();
      body.classList.remove(`hide-overflow`);
    }
  });
});

const siteFooterElement = body.querySelector(`.footer`);
render(siteFooterElement, createFooterStatistics());
