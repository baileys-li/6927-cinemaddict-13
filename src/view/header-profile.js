import {createElement} from "../utils";

const createHeaderProfile = () => {
  return `<section class="header__profile profile">
  <p class="profile__rating">Sci-Fighter</p>
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};

export default class HeaderProfile {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createHeaderProfile();
  }

  getElement() {
    return this._element ? this._element : createElement(this.getTemplate());
  }

  removeElement() {
    this._element = null;
  }
}
