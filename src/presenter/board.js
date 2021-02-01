import SortFilters from "../view/sort-filters";
import FilmsSection from "../view/films-section";
import FilmsList from "../view/films-list";
import Movie from "./movie";
import ShowMoreButton from "../view/show-more-button";

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
      const movie = new Movie(this._allMoviesList);
      movie.init(this._movies[index]);
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

