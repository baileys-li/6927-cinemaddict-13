import "./view/film-details";

import { generateMovie } from "./mock/movie";
import { generateFilter } from "./mock/filters";

import { renderElement } from "./utils";

import { MOVIE_COUNT, MOVIE_COUNT_PER_STEP } from "./const";
import HeaderProfile from "./view/header-profile";
import FooterStatistics from "./view/footer-statistics";
import MainNavigation from "./view/main-navigation";
import SortFilters from "./view/sort-filters";
import FilmsSection from "./view/films-section";
import FilmsList from "./view/films-list";
import FilmCard from "./view/film-card";
import ShowMoreButton from "./view/show-more-button";

const body = document.body;
const siteHeaderElement = body.querySelector(`.header`);
renderElement(siteHeaderElement, new HeaderProfile().getElement());

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector(`.main`);
renderElement(
  siteMainElement,
  new MainNavigation(filters).getElement(),
  `afterbegin`
);
renderElement(siteMainElement, new SortFilters().getElement());
renderElement(siteMainElement, new FilmsSection().getElement());

const siteFilmSection = body.querySelector(`.films`);
const allMovies = {
  headline: `All movies. Upcoming`,
  isExtra: false,
};

const allMoviesComponent = new FilmsList(allMovies).getElement();
renderElement(siteFilmSection, allMoviesComponent);

const allMoviesList = allMoviesComponent.querySelector(
  `.films-list__container`
);

for (
  let index = 0;
  index < Math.min(movies.length, MOVIE_COUNT_PER_STEP);
  index++
) {
  renderElement(allMoviesList, new FilmCard(movies[index]).getElement());
}

if (movies.length > MOVIE_COUNT_PER_STEP) {
  const showMore = new ShowMoreButton();
  const showMoreElement = showMore.getElement();

  renderElement(allMoviesComponent, showMoreElement);

  showMoreElement.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    const renderedMovieCount = allMoviesList.childElementCount;

    let loopEnd = renderedMovieCount + MOVIE_COUNT_PER_STEP;

    if (loopEnd >= movies.length) {
      loopEnd = movies.length;
      showMoreElement.remove();
      showMore.removeElement();
    }

    for (let index = renderedMovieCount; index < loopEnd; index++) {
      renderElement(allMoviesList, new FilmCard(movies[index]).getElement());
    }
  });
}

const topMovies = {
  headline: `Top rated`,
  isExtra: true,
};
const mostCommentedMovies = {
  headline: `Most commented`,
  isExtra: true,
};
renderElement(siteFilmSection, new FilmsList(topMovies).getElement());
renderElement(siteFilmSection, new FilmsList(mostCommentedMovies).getElement());

const siteFooterElement = body.querySelector(`.footer`);
renderElement(
  siteFooterElement,
  new FooterStatistics(MOVIE_COUNT).getElement()
);
