import FilmCard from "../view/film-card";
import FilmDetail from "../view/film-details";
import { render, remove } from "../utils/render";

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
    this._movieCardView = new FilmCard(movie);
    render(this._parentElement, this._movieCardView);

    this._movieCardView.setOpenDetailClickHandler(this._openMovieDetail);
  }

  _openMovieDetail() {
    this._movieDetailView = new FilmDetail(this._movie);

    const body = document.body;
    body.classList.add(`hide-overflow`);
    render(body, this._movieDetailView);

    this._movieDetailView.setCloseDetail(this._closeDetail);
  }

  _closeDetail() {
    remove(this._movieDetailView);
    this._movieDetailView = null;
    document.body.classList.remove(`hide-overflow`);
  }
}
