import FilmCard from "../view/film-card";
import FilmDetail from "../view/film-details";
import FilmCardControl from "../view/film-card-control";
import {render, remove, replace} from "../utils/render";

const Mode = {
  DEFAULT: `DEFAULT`,
  DETAIL: `DETAIL`,
};
export default class Movie {
  constructor(parentElement, changeData, changeMode) {
    this._parentElement = parentElement;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._movieCardView = null;
    this._movieDetailView = null;
    this._mode = Mode.DEFAULT;

    this._openMovieDetail = this._openMovieDetail.bind(this);
    this._closeMovieDetail = this._closeMovieDetail.bind(this);

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
      render(this._parentElement, this._movieCardView);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._movieCardView, prevMovieCardView);
    }

    remove(prevMovieCardView);
  }

  _renderMovieCard() {
    this._movieCardView = new FilmCard(this._movie);
    this._controlsContainer = this._movieCardView
      .getElement()
      .querySelector(`.film-card__controls`);
    this._renderControls();
    this._movieCardView.setWatchListClickHandler(this._handleWatchListClick);
    this._movieCardView.setWatchedClickHandler(this._handleWatchedClick);
    this._movieCardView.setFavoriteClickHandler(this._handleFavoriteClick);
    this._movieCardView.setOpenDetailClickHandler(this._openMovieDetail);
  }

  destroy() {
    remove(this._movieCardView);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._closeMovieDetail();
    }
  }

  _openMovieDetail() {
    const body = document.body;
    body.classList.add(`hide-overflow`);
    this._movieDetailView = new FilmDetail(this._movie);
    render(body, this._movieDetailView);
    this._movieDetailView.setCloseDetail(this._closeMovieDetail);
    this._changeMode();
    this._mode = Mode.DETAIL;
  }

  _renderControls() {
    const {isInWatchlist, isWatched, isFavorite} = this._movie;

    const CONTROL_PARAMETERS = [
      {
        title: `Add to watchlist`,
        modifier: `add-to-watchlist`,
        isActive: isInWatchlist,
      },
      {
        title: `Mark as watched`,
        modifier: `mark-as-watched`,
        isActive: isWatched,
      },
      {
        title: `Mark as favorite`,
        modifier: `favorite`,
        isActive: isFavorite,
      },
    ];

    CONTROL_PARAMETERS.forEach((control) => {
      render(this._controlsContainer, new FilmCardControl(control));
    });
  }

  _closeMovieDetail() {
    remove(this._movieDetailView);
    this._movieDetailView = null;
    document.body.classList.remove(`hide-overflow`);
    this._mode = Mode.DEFAULT;
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
