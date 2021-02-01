import FilmCard from "../view/film-card";
import FilmDetail from "../view/film-details";
import FilmCardControl from "../view/film-card-control";
import { render, remove, replace } from "../utils/render";

export default class Movie {
  constructor(parentElement, changeData) {
    this._parentElement = parentElement;
    this._changeData = changeData;

    this._movieCardView = null;
    this._movieDetailView = null;

    this._openMovieDetail = this._openMovieDetail.bind(this);
    this._closeDetail = this._closeDetail.bind(this);

    this._handleWatchListClick = this._handleWatchListClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  }

  init(movie) {
    this._movie = movie;

    const prevMovieCardView = this._movieCardView;

    this._renderMovieCard();

    if (prevMovieCardView === null) {
      this._renderMovieCard();
      return;
    }

    if (this._parentElement.contains(prevMovieCardView.getElement())) {
      replace(this._movieCardView, prevMovieCardView);
    }
    remove(prevMovieCardView);
  }

  _renderMovieCard() {
    this._movieCardView = new FilmCard(this._movie);
    render(this._parentElement, this._movieCardView);
    this._renderControls();
    this._movieCardView.setWatchListClickHandler(this._handleWatchListClick);
    this._movieCardView.setWatchedClickHandler(this._handleWatchedClick);
    this._movieCardView.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardView.setOpenDetailClickHandler(this._openMovieDetail);
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

  _handleWatchListClick() {
    this._changeData(
      Object.assign({}, this._movie, {
        isInWatchlist: !this._movie.isFavorite,
      })
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign({}, this._movie, {
        isWatched: !this._movie.isFavorite,
      })
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign({}, this._movie, {
        isFavorite: !this._movie.isFavorite,
      })
    );
  }
}
