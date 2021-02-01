import AbstractView from "./_abstract";

const createFilmCardControl = (control) => {
  const {text, modifier, isActive} = control;
  const activeClass = isActive ? `film-card__controls-item--active` : ``;
  return `<button class="film-card__controls-item button film-card__controls-item--${modifier} ${activeClass}" type="button">
    ${text}
  </button>`;
};

export default class FilmCardControl extends AbstractView {
  constructor(controlData) {
    super();
    this._controlData = controlData;
  }

  getTemplate() {
    return createFilmCardControl(this._controlData);
  }
}
