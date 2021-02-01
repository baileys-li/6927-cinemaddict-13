import {generateMovie} from "./mock/movie";
import {generateFilter} from "./mock/filters";
import {render, remove} from "./utils/render";
import {MOVIE_COUNT, MOVIE_COUNT_PER_STEP} from "./const";

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
render(siteHeaderElement, new HeaderProfile());

const movies = new Array(MOVIE_COUNT).fill().map(generateMovie);
const filters = generateFilter(movies);

const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNavigation(filters), `afterbegin`);

const siteFilmSection = new FilmsSection();

if (movies.length) {
  render(siteMainElement, new SortFilters());
  render(siteMainElement, siteFilmSection);

  const allMovies = {
    headline: `All movies. Upcoming`,
    isExtra: false,
  };

  const allMoviesComponent = new FilmsList(allMovies).getElement();
  render(siteFilmSection, allMoviesComponent);

  const allMoviesList = allMoviesComponent.querySelector(
      `.films-list__container`
  );

  const renderMovies = (from, to) => {
    for (let index = from; index < to; index++) {
      const filmCard = new FilmCard(movies[index]).getElement();
      render(allMoviesList, filmCard);

      const title = filmCard.querySelector(`.film-card__title`);
      const poster = filmCard.querySelector(`.film-card__poster`);
      const comments = filmCard.querySelector(`.film-card__comments`);

      openMovieDetailOnClick(title, movies[index]);
      openMovieDetailOnClick(poster, movies[index]);
      openMovieDetailOnClick(comments, movies[index]);
    }
  };

  renderMovies(0, Math.min(movies.length, MOVIE_COUNT_PER_STEP));

  if (movies.length > MOVIE_COUNT_PER_STEP) {
    const showMore = new ShowMoreButton();
    render(allMoviesComponent, showMore);

    showMore.setClickHandler(() => {
      const renderedMovieCount = allMoviesList.childElementCount;

      let loopEnd = renderedMovieCount + MOVIE_COUNT_PER_STEP;

      if (loopEnd >= movies.length) {
        loopEnd = movies.length;
        remove(showMore);
      }

      renderMovies(renderedMovieCount, loopEnd);
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
  render(siteFilmSection, new FilmsList(topMovies));
  render(siteFilmSection, new FilmsList(mostCommentedMovies));
} else {
  render(siteMainElement, siteFilmSection);

  const emptyList = {
    headline: `There are no movies in our database`,
    isExtra: false,
    isEmpty: true,
  };
  render(siteFilmSection, new FilmsList(emptyList));
}

const siteFooterElement = body.querySelector(`.footer`);
render(siteFooterElement, new FooterStatistics(movies.length));

function openMovieDetailOnClick(element, movie) {
  element.style.cursor = `pointer`;
  element.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    body.classList.add(`hide-overflow`);
    const movieDetail = new FilmDetail(movie);
    render(body, movieDetail);
    const movieDetailElement = movieDetail.getElement();

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
      remove(movieDetail);
      body.classList.remove(`hide-overflow`);
    }
  });
}
