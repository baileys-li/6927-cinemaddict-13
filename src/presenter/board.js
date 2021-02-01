import SortFilters from "../view/sort-filters";
import FilmsSection from "../view/films-section";
import FilmsList from "../view/films-list";
import Movie from "./movie";
import ShowMoreButton from "../view/show-more-button";
import { updateItem } from "../utils/common.js";

import { render, remove } from "../utils/render";
import { MOVIE_COUNT_PER_STEP, ListParameter } from "../const";

import { SortType } from "../const.js";

export default class MovieBoard {
  constructor(parentElement) {
    this._parentElement = parentElement;
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this._moviePresenter = {};
    this._lists = [];
    this._currentSortType = SortType.DEFAULT;

    this._filmsSection = new FilmsSection();
    this._sortFilters = new SortFilters(this._currentSortType);

    this._handleMovieChange = this._handleMovieChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(movies) {
    this._movies = movies.slice();
    this._sourcedMovies = movies.slice();
    this._moviesCount = this._movies.length;

    if (!this._moviesCount) {
      this._renderNoMovies();
    } else {
      this._renderBoard();
    }
  }

  _renderBoard() {
    this._lists.push(ListParameter.ALL);

    this._renderSortFilter();
    this._renderLists();
    this._renderMovieList();
  }
  _renderSortFilter() {
    if (this._moviesCount) {
      render(this._parentElement, this._sortFilters);
      this._sortFilters.setSortTypeChangeHandler(this._handleSortTypeChange);
    }
  }

  _renderNoMovies() {
    this._lists = [ListParameter.EMPTY];
    this._renderLists();
  }

  _renderLists() {
    render(this._parentElement, this._filmsSection);
    this._lists.forEach((list) => {
      render(this._filmsSection, new FilmsList(list));
    });
  }

  _renderMovies(from, to) {
    this._movies.slice(from, to).forEach((movie) => {
      this._renderMovie(movie);
    });
  }

  _renderMovie(movie) {
    const container = this._filmsSection
      .getElement()
      .querySelector(`.films-list__container`);

    const moviePresenter = new Movie(
      container,
      this._handleMovieChange,
      this._handleModeChange
    );
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderMovieList() {
    this._renderMovies(0, Math.min(this._moviesCount, MOVIE_COUNT_PER_STEP));

    if (this._moviesCount > MOVIE_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _renderShowMoreButton() {
    const allMoviesComponent = this._filmsSection
      .getElement()
      .querySelector(`.films-list`);

    this._showMoreButton = new ShowMoreButton();
    render(allMoviesComponent, this._showMoreButton);

    this._showMoreButton.setClickHandler(() => {
      let loopEnd = this._renderedMovieCount + MOVIE_COUNT_PER_STEP;

      this._renderMovies(
        this._renderedMovieCount,
        Math.min(loopEnd, this._moviesCount)
      );
      this._renderedMovieCount += MOVIE_COUNT_PER_STEP;

      if (this._renderedMovieCount >= this._moviesCount) {
        this._renderedMovieCount = this._moviesCount;
        remove(this._showMoreButton);
      }
    });
  }

  _clearMovieList() {
    Object.values(this._moviePresenter).forEach((presenter) =>
      presenter.destroy()
    );
    this._moviePresenter = {};
    this._renderedMovieCount = MOVIE_COUNT_PER_STEP;
    remove(this._showMoreButton);
  }

  _handleMovieChange(updatedMovie) {
    this._movies = updateItem(this._movies, updatedMovie);
    this._moviePresenter[updatedMovie.id].init(updatedMovie);
  }

  _handleModeChange() {
    Object.values(this._moviePresenter).forEach((presenter) =>
      presenter.resetView()
    );
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
  }

  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._movies = this._movies.sort(
          (movieA, movieB) => movieB.year - movieA.year
        );
        break;
      case SortType.RATING:
        this._movies = this._movies.sort(
          (movieA, movieB) => movieB.rating - movieA.rating
        );
        break;
      default:
        this._movies = this._sourcedMovies.slice();
    }

    this._currentSortType = sortType;
  }
}
