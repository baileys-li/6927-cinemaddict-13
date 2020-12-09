import {createFilmCard} from "./film-card";
import {createShowMore} from "./show-more-button";

export const createFilmsList = (list, movies) => {
  const sectionExtraClass = list.isExtra ? `films-list--extra` : ``;
  const headlineExtraClass = list.isExtra ? `` : `visually-hidden`;
  const showMoreBtn = list.isExtra ? `` : createShowMore();

  let films = ``;
  for (let index = 0; index < list.filmsNumber; index++) {
    films += createFilmCard(movies[index]);
  }

  return `<section class="films-list ${sectionExtraClass}">
  <h2 class="films-list__title ${headlineExtraClass}">${list.headline}</h2>

  <div class="films-list__container">
  ${films}
  </div>
  ${showMoreBtn}
</section>`;
};
