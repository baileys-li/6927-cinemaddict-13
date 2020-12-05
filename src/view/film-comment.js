import { generateComment } from "../mock/comment";
import dayjs from "dayjs";

export const createFilmComment = () => {
  const { author, date, emoji, message } = generateComment();

  const returnFormattedDate = () => {
    const formatDate = dayjs(date);
    const currentDate = dayjs();
    const yearDiff = formatDate.diff(currentDate, "year");
    if (yearDiff >= 1) {
      return dayjs(date).format(`YYYY/M/D H:m`);
    } else {
      const monthDiff = formatDate.diff(currentDate, "month");
      console.log(`Month diff: ${monthDiff}`);
      if (monthDiff >= 1) {
        return `${formatDate.diff(currentDate, "month")} months ago`;
      } else {
        const dayDiff = formatDate.diff(currentDate, "month");
        if (dayDiff >= 1) {
          return `${dayDiff} days ago`;
        } else {
          return `Today`;
        }
      }
    }
  };

  return `<li class="film-details__comment">
  <span class="film-details__comment-emoji">
    <img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-smile">
  </span>
  <div>
    <p class="film-details__comment-text">${message}</p>
    <p class="film-details__comment-info">
      <span class="film-details__comment-author">${author}</span>
      <span class="film-details__comment-day">${returnFormattedDate()}</span>
      <button class="film-details__comment-delete">Delete</button>
    </p>
  </div>
</li>`;
};
