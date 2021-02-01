import AbstractView from "./_abstract";

const createFilmCard = (movie) => {
  const {title, poster, description, comments, rating, year} = movie;
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">1h 18m</span>
    <span class="film-card__genre">Mystery</span>
  </p>
  <img src="./images/posters/${poster}" alt="Poster of '${title}'" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${comments.length} comments</a>
  <div class="film-card__controls">
  </div>
</article>`;
};

export default class FilmCard extends AbstractView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._openDetailClickHandler = this._openDetailClickHandler.bind(this);

    this._toWatchClickHandler = this._toWatchClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._movie);
  }

  _openDetailClickHandler(evt) {
    evt.preventDefault();
    this._callback.clickOpenDetail(this._movie);
  }

  _toWatchClickHandler(evt) {
    evt.preventDefault();
    this._callback.toWatchClick();
  }
  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }
  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setOpenDetailClickHandler(callback) {
    this._callback.clickOpenDetail = callback;

    const OPEN_DETAIL_ELEMENTS = [`title`, `poster`, `comments`];
    OPEN_DETAIL_ELEMENTS.forEach((element) => {
      const elementMarkup = this.getElement().querySelector(
          `.film-card__${element}`
      );
      elementMarkup.style.cursor = `pointer`;
      elementMarkup.addEventListener(`click`, this._openDetailClickHandler);
    });
  }

  setWatchListClickHandler(callback) {
    this._callback.toWatchClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, this._toWatchClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, this._watchedClickHandler);
  }


  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement()
      .querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, this._favoriteClickHandler);
  }


}
