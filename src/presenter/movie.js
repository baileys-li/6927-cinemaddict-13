import FilmCard from "../view/film-card";
import FilmDetail from "../view/film-details";
import FilmCardControl from "../view/film-card-control";
import { render, remove, replace } from "../utils/render";

export default class Movie {
  constructor(parentElement) {
    this._parentElement = parentElement;

    this._movieCardView = null;
    this._movieDetailView = null;

    this._openMovieDetail = this._openMovieDetail.bind(this);
    this._closeDetail = this._closeDetail.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieCardView = this._movieCardView;
    const prevMovieDetailView = this._movieDetailView;

    this._movieCardView = new FilmCard(this._movie);
    this._movieDetailView = new FilmDetail(this._movie);


    this._movieCardView.setOpenDetailClickHandler(this._openMovieDetail);


    if (prevMovieCardView === null || prevMovieDetailView === null) {
      render(this._parentElement, this._movieCardView);
      this._renderControls();
      this._movieCardView.setOpenDetailClickHandler(this._openMovieDetail);
      return;
    }

    if (this._parentElement.contains(prevMovieCardView.getElement())) {
      replace(this._movieCardView, prevMovieCardView);
    }

    if (document.body.contains(prevMovieDetailView.getElement())) {
      replace(this._movieDetailView, prevMovieDetailView);
    }

    remove(prevMovieCardView);
    remove(prevMovieDetailView);
  }


  destroy() {
    remove(this._movieCardView);
    remove(this._movieDetailView);
  }

  _openMovieDetail() {
    const body = document.body;
    body.classList.add(`hide-overflow`);
    render(body, this._movieDetailView);

    this._movieDetailView.setCloseDetail(this._closeDetail);
  }

  _renderControls() {
    const controlsContainers = this._movieCardView
      .getElement()
      .querySelector(`.film-card__controls`);
    const { isInWatchlist, isWatched, isFavorite } = this._movie;

    render(
      controlsContainers,
      new FilmCardControl({
        title: `Add to watchlist`,
        modifier: `add-to-watchlist`,
        isActive: isInWatchlist,
      })
    );
    render(
      controlsContainers,
      new FilmCardControl({
        title: `Mark as watched`,
        modifier: `mark-as-watched`,
        isActive: isWatched,
      })
    );

    render(
      controlsContainers,
      new FilmCardControl({
        title: `Mark as favorite`,
        modifier: `favorite`,
        isActive: isFavorite,
      })
    );
  }

  _closeDetail() {
    remove(this._movieDetailView);
    this._movieDetailView = null;
    document.body.classList.remove(`hide-overflow`);
  }
}
