export const EMOJI = [`angry`, `puke`, `sleeping`, `smile`];
export const MOVIE_COUNT = 18;
export const MOVIE_COUNT_PER_STEP = 5;

export const LIST_PARAMETERS = {
  empty: {
    headline: `There are no movies in our database`,
    isExtra: false,
    isEmpty: true,
  },
  all: {
    headline: `All movies. Upcoming`,
    isExtra: false,
  },
  top: {
    headline: `Top rated`,
    isExtra: true,
  },
  mostCommented: {
    headline: `Most commented`,
    isExtra: true,
  },
};

export const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`
};
