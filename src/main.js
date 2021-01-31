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
import FilmDetail from "./view/film-details";

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

renderElement(siteMainElement, new FilmsSection().getElement());

const siteFilmSection = body.querySelector(`.films`);
if (movies.length) {
  renderElement(siteMainElement, new SortFilters().getElement());

  const allMovies = {
    headline: `All movies. Upcoming`,
    isExtra: false,
  };

  const allMoviesComponent = new FilmsList(allMovies).getElement();
  renderElement(siteFilmSection, allMoviesComponent);

  const allMoviesList = allMoviesComponent.querySelector(
    `.films-list__container`
  );

  renderMovies(0, Math.min(movies.length, MOVIE_COUNT_PER_STEP));

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

      renderMovies(renderedMovieCount, loopEnd);
    });
  }

  function renderMovies(from, to) {
    for (let index = from; index < to; index++) {
      const filmCard = new FilmCard(movies[index]).getElement();
      renderElement(allMoviesList, filmCard);

      const title = filmCard.querySelector(`.film-card__title`);
      const poster = filmCard.querySelector(`.film-card__poster`);
      const comments = filmCard.querySelector(`.film-card__comments`);

      openMovieDetailOnClick(title, movies[index]);
      openMovieDetailOnClick(poster, movies[index]);
      openMovieDetailOnClick(comments, movies[index]);
    }
  }

  function openMovieDetailOnClick(element, movie) {
    element.style.cursor = `pointer`;
    element.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      body.classList.add(`hide-overflow`);
      const movieDetail = new FilmDetail(movie);
      const movieDetailElement = movieDetail.getElement();
      renderElement(body, movieDetailElement);

      const closeButton = movieDetailElement.querySelector(
        `.film-details__close-btn`
      );

      closeButton.addEventListener(`click`, closePopup);

      document.addEventListener(`keydown`, onEscKeydown);

      function onEscKeydown(escEvt) {
        if (escEvt.key === `Escape` || escEvt.key === `Esc`) {
          escEvt.preventDefault();
          closePopup();
          document.removeEventListener(`keydown`, onEscKeydown);
        }
      }

      function closePopup() {
        movieDetailElement.remove();
        movieDetail.removeElement();
        body.classList.remove(`hide-overflow`);
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
  renderElement(
    siteFilmSection,
    new FilmsList(mostCommentedMovies).getElement()
  );
} else {
  const emptyList = {
    headline: `There are no movies in our database`,
    isExtra: false,
    isEmpty: true,
  };

  const emptyListComponent = new FilmsList(emptyList).getElement();
  renderElement(siteFilmSection, emptyListComponent);
}

const siteFooterElement = body.querySelector(`.footer`);
renderElement(
  siteFooterElement,
  new FooterStatistics(movies.length).getElement()
);
