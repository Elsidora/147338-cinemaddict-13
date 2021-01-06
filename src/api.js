import FilmsModel from "./model/films";
import CommentsModel from "./model/comments";

const Method = {
  GET: `GET`,
  PUT: `PUT`,
  POST: `POST`,
  DELETE: `DELETE`,
};

const SuccessHTTPStatusRange = {
  MIN: 200,
  MAX: 299
};

export default class Api {
  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  getMovies() {
    return this._load({url: `movies`})
      .then(Api.toJSON)
      .then((movies) => movies.map(FilmsModel.adaptToClient));
  }

  getComments(movie) {
    return this._load({url: `comments/${movie.id}`})
    .then(Api.toJSON)
    .then((comments) => comments.map(CommentsModel.adaptToClient));
  }


  updateMovie(movie) {
    console.log(`Step 10 заходим в метод api updateMovie`);
    return this._load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(FilmsModel.adaptToServer(movie)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(FilmsModel.adaptToClient);
  }

  addComment(movie, comment) {
    console.log(`5 - api addComment`);
    return this._load({
      url: `comments/${movie.id}`,
      method: Method.POST,
      body: JSON.stringify(CommentsModel.adaptToServer(comment)),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then(Api.toJSON)
      .then(CommentsModel.adaptToClient);

  }

  deleteComment(id) {
    return this._load({
      url: `comments/${id}`,
      method: Method.DELETE
    });
  }

  _load({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers()
  }) {
    console.log(`Step 6 заходим в метод api _load`);
    headers.append(`Authorization`, this._authorization);

    return fetch(
        `${this._endPoint}/${url}`,
        {method, body, headers}
    )
      .then(Api.checkStatus)
      .catch(Api.catchError);
  }

  static checkStatus(response) {
    if (
      response.status < SuccessHTTPStatusRange.MIN ||
      response.status > SuccessHTTPStatusRange.MAX
    ) {
      // console.log(`Step - error`);
      throw new Error(`${response.status}: ${response.statusText}`);
    }
    console.log(`Step 7 - checkstatus`);
    return response;
  }

  static toJSON(response) {
    return response.json();
  }

  static catchError(err) {
    throw err;
  }
}
