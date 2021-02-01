import SortFilters from "../view/sort-filters";
import FilmsSection from "../view/films-section";
import FilmsList from "../view/films-list";
import FilmCard from "../view/film-card";
import ShowMoreButton from "../view/show-more-button";
import FilmDetail from "../view/film-details";

import {render, remove} from "../utils/render";
import {MOVIE_COUNT_PER_STEP} from "../const";

const LIST_PARAMETERS = {
  empty: {
    headline: `There are no movies in our database`,
    isExtra: false,
    isEmpty: true,
  },
  all: {
    headline: `All movies. Upcoming`,
    isExtra: false,
  },
  top: {
    headline: `Top rated`,
    isExtra: true,
  },
  mostCommented: {
    headline: `Most commented`,
    isExtra: true,
  },
};

export default class MovieBoard {
  constructor(parentElement) {
    this._parentElement = parentElement;

    this._filmsSection = new FilmsSection();
    this._sortFilters = new SortFilters();
    this._lists = [];
  }

  init(movies) {
    this._movies = movies.slice();
    this._moviesCount = this._movies.length;

    this._renderSortFilter();

    render(this._parentElement, this._filmsSection);
    this._renderLists();
    if (this._moviesCount) {
      this._renderMoviesInMainList();
    }
  }

  _renderSortFilter() {
    if (this._moviesCount) {
      render(this._parentElement, this._sortFilters);
    }
  }

  _renderLists() {
    if (!this._moviesCount) {
      this._lists.push(LIST_PARAMETERS.empty);
    } else {
      this._lists.push(LIST_PARAMETERS.all);
      this._lists.push(LIST_PARAMETERS.top);
      this._lists.push(LIST_PARAMETERS.mostCommented);
    }
    this._lists.forEach((list) => {
      render(this._filmsSection, new FilmsList(list));
    });
  }

  _renderMovies(from, to) {
    for (let index = from; index < to; index++) {
      const filmCard = new FilmCard(this._movies[index]).getElement();
      render(this._allMoviesList, filmCard);

      const title = filmCard.querySelector(`.film-card__title`);
      const poster = filmCard.querySelector(`.film-card__poster`);
      const comments = filmCard.querySelector(`.film-card__comments`);

      openMovieDetailOnClick(title, this._movies[index]);
      openMovieDetailOnClick(poster, this._movies[index]);
      openMovieDetailOnClick(comments, this._movies[index]);
    }
  }

  _renderMoviesInMainList() {
    this._allMoviesList = this._filmsSection
      .getElement()
      .querySelector(`.films-list__container`);
    this._renderMovies(0, Math.min(this._moviesCount, MOVIE_COUNT_PER_STEP));

    if (this._moviesCount > MOVIE_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    const allMoviesComponent = this._filmsSection
      .getElement()
      .querySelector(`.films-list `);

    this._showMoreButton = new ShowMoreButton();
    render(allMoviesComponent, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      const renderedMovieCount = this._allMoviesList.childElementCount;

      let loopEnd = renderedMovieCount + MOVIE_COUNT_PER_STEP;

      if (loopEnd >= this._moviesCount) {
        loopEnd = this._moviesCount;
        remove(this._showMoreButton);
      }

      this._renderMovies(renderedMovieCount, loopEnd);
    });
  }
}

function openMovieDetailOnClick(element, movie) {
  element.style.cursor = `pointer`;

  const body = document.body;
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
