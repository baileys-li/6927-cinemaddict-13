import dayjs from "dayjs";

export const createFilmComment = (comment) => {
  const {author, date, emoji, message} = comment;
  const dateText = formatDate(date);

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${dateText}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};

const formatDate = (date) => {
  const formattedDate = dayjs(date);
  const currentDate = dayjs();

  const TIME_UNIT = [`year`, `month`, `day`];
  let output = false;

  TIME_UNIT.forEach((timeUnit) => {
    if (!output) {
      output = checkDiff(timeUnit);
    }
  });

  return output;

  function checkDiff(timeUnit) {
    const difference = currentDate.diff(formattedDate, timeUnit);
    switch (difference) {
      case 1:
        return `1 ${timeUnit} ago`;

      case 0:
        return timeUnit === `day` ? `Today` : false;

      default:
        return timeUnit === `year`
          ? dayjs(date).format(`YYYY/M/D H:m`)
          : `${difference} ${timeUnit}s ago`;
    }
  }
};
