import Observer from "../utils/observer";

export default class CommentsModel extends Observer {
  constructor() {
    super();
    this._comments = [];
  }

  setComments(updateType, comments) {
    this._comments = comments;

    this._notify(updateType);
  }

  getComments() {
    return this._comments;
  }

  addComment(updateType, update) {
    console.log(`8 - addComment model`);
    this._comments = [
      update,
      ...this._comments.slice(),
    ];
    // console.log(update);
    this._notify(updateType, update);
  }

  deleteComment(id) {
    const index = this._comments.findIndex((comment) => id === comment.id);
    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];
  }

  /*
  deleteComment(updateType, update) {
    const index = this._comments.findIndex((comment) => update.id === comment.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._comments = [
      ...this._comments.slice(0, index),
      ...this._comments.slice(index + 1)
    ];

    this._notify(updateType);
  }
  */

  static adaptToClient(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          text: comment.comment,
          date: new Date(comment.date),
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedComment.comment;
    // delete adaptedComment.date;

    return adaptedComment;
  }

  static adaptToServer(comment) {
    const adaptedComment = Object.assign(
        {},
        comment,
        {
          "comment": comment.text,
          "date": comment.date.toISOString(),
        }
    );

    // Ненужные ключи мы удаляем
    delete adaptedComment.text;
    // delete adaptedComment.date;

    return adaptedComment;
  }
}
