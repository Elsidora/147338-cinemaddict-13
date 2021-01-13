import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import duration from "dayjs/plugin/duration";
dayjs.extend(relativeTime);
dayjs.extend(duration);

const getUserStatus = (count) => {
  if (count <= 10) {
    return `Novice`;
  } else if (count <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};

const helpersDate = {
  releaseTrimmdDate: (dateObject) => dayjs(dateObject).format(`YYYY`),
  releaseFullDate: (dateObject) => dayjs(dateObject).format(`DD MMMM YYYY`),
  releaseCommentDate: (dateObject) => dayjs(dateObject).fromNow(),
  // runtimeInHours: (generalRuntime) => dayjs.duration(generalRuntime, `minutes`).format(`HH`),
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

const sortDate = ((a, b) => {
  // return b.releaseDate - a.releaseDate;
  return dayjs(b.releaseDate).diff(dayjs(a.releaseDate));
});

const sortRating = ((a, b) => {
  return b.rating - a.rating;
});

const sortComment = ((a, b) => {
  return b.comments.length - a.comments.length;
});


export {getUserStatus, isEscapeEvent, helpersDate, getDurationMovie, sortDate, sortRating, sortComment};
