import SmartView from "./smart";
import {emotions} from "../consts";

const getEmotion = (emotion) => {
  return emotion !== ``
    ? createEmotionTemplate(emotion)
    : ``;
};

const createEmotionTemplate = (emotion) => `<img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">`;

const createInputEmotionTemplate = emotions.map((emotion) => `
  <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>`).join(``);

const createUserMessageTemplate = (comment) => {
  const {emotion, text} = comment;
  return `<div class="film-details__new-comment">
  <div class="film-details__add-emoji-label">${getEmotion(emotion)}</div>

  <label class="film-details__comment-label">
    <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
  </label>
  <div class="film-details__emoji-list">
    ${createInputEmotionTemplate}
  </div>
  </div>`;
};

export default class MessageUser extends SmartView {
  constructor() {
    super();

    this._data = {
      date: new Date(),
      emotion: ``,
      text: ``
    };

    this._commentInputHandler = this._commentInputHandler.bind(this);
    this._emojiListClickHandler = this._emojiListClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
  }

  getTemplate() {
    return createUserMessageTemplate(this._data);
  }

  getNewDate() {
    return Object.assign(
        {},
        this._data,
        {
          date: new Date().toISOString()
        }
    );
  }


  _commentInputHandler(evt) {
    evt.preventDefault();
    this.updateData({
      text: evt.target.value
    }, true);
  }

  _emojiListClickHandler(evt) {
    evt.preventDefault();
    this.updateData({
      emotion: evt.target.value
    });
  }

  _formSubmitHandler(evt) {
    // evt.preventDefault();
    console.log(`2 - aaaaaaaaaaaa`);
    if (evt.ctrlKey && evt.key === `Enter`) {
      evt.preventDefault();
      console.log(`3 - hello`);
      this._callback.formSubmit(this._data);
    }
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    console.log(`1 - this`);
    this.getElement().addEventListener(`keydown`, this._formSubmitHandler);
  }

  restoreHandlers() {
    const element = this.getElement();
    element.querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentInputHandler);
    element.querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiListClickHandler);
    element.addEventListener(`keydown`, this._formSubmitHandler);
  }
}

