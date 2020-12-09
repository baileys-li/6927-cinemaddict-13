import {createElement} from "../utils";

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
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};

export default class FilmCard {
  constructor(movie) {
    this._element = null;
    this._movie = movie;
  }

  getTemplate() {
    return createFilmCard(this._movie);
  }

  getElement() {
    return this._element ? this._element : createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
