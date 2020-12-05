export const createFilmCard = ({title, poster, description, commentsCount}) => {
  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">8.9</p>
  <p class="film-card__info">
    <span class="film-card__year">1945</span>
    <span class="film-card__duration">1h 18m</span>
    <span class="film-card__genre">Mystery</span>
  </p>
  <img src="./images/posters/${poster}" alt="Poster of '${title}'" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <a class="film-card__comments">${commentsCount} comments</a>
  <div class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div>
</article>`;
};
