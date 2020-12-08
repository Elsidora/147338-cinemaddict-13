import AbstractView from "./abstract";
const createFooterStatisticsTemplate = (cards) => {
  return `<p>${cards.length} movies inside</p>`;
};

export default class FooterStatistics extends AbstractView {
  constructor(cards) {
    super();
    this._cards = cards;
  }

  getTemplate() {
    return createFooterStatisticsTemplate(this._cards);
  }
}
