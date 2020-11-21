import {getRandomInteger, getRandomArrayElement} from "../utils";
import {authors, emotions, textComments} from "../consts";

const generateAuthor = () => getRandomArrayElement(authors);

const generateEmotion = () => getRandomArrayElement(emotions);
  
const generateText = () => getRandomArrayElement(textComments);

const generateDate = () => {
  return new Date(getRandomInteger(2017, 2020), getRandomInteger(0, 11), getRandomInteger(1, 31), getRandomInteger(0, 23), getRandomInteger(0, 59));
};

export const generateComment = () => {
  return {
    author: generateAuthor(),
    emotion: generateEmotion(),
    text: generateText(),
    date: generateDate()
  };
};