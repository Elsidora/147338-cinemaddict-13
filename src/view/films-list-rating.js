import AbstractView from "./abstract";
const createFilmsListRatingTemplate = () => {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Top rated</h2>
    </section>
  `.trim();
};

export default class FilmsListRating extends AbstractView {

  getTemplate() {
    return createFilmsListRatingTemplate();
  }
}
