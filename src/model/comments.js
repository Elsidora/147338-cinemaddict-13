import Observer from "../utils/observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setFilms(comments) {
    this._comments = comments.slice();
  }

  getFilms() {
    return this._comments;
  }
}
