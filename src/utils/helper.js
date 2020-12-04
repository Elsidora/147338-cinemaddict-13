import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const helpersDate = {
  releaseTrimmdDate: (dateObject) => dayjs(dateObject).format(`YYYY`),
  releaseFullDate: (dateObject) => dayjs(dateObject).format(`DD MMMM YYYY`),
  releaseCommentDate: (dateObject) => dayjs(dateObject).fromNow(),
  // format(`YYYY/MM/DD HH:mm`),
};

const getDurationMovie = (minutesCount) => {
  const hours = Math.floor(minutesCount / 60);
  const minutes = minutesCount % 60;
  return hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const isEscapeEvent = (evt, action) => {
  if (evt.key === `Escape` || evt.key === `Esc`) {
    action();
  }
};

export {isEscapeEvent, helpersDate, getDurationMovie};
