export const EMOJI = [`angry`, `puke`, `sleeping`, `smile`];
export const MOVIE_COUNT = 18;
export const MOVIE_COUNT_PER_STEP = 5;

export const ListParameter = {
  EMPTY: {
    headline: `There are no movies in our database`,
    isExtra: false,
    isEmpty: true,
  },
  ALL: {
    headline: `All movies. Upcoming`,
    isExtra: false,
  },
  TOP: {
    headline: `Top rated`,
    isExtra: true,
  },
  MOST_COMMENTED: {
    headline: `Most commented`,
    isExtra: true,
  },
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};
