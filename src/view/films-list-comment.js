import AbstractView from "./abstract";
const createFilmsListCommentTemplate = () => {
  return `
    <section class="films-list films-list--extra">
      <h2 class="films-list__title">Most commented</h2>
    </section>
  `.trim();
};

export default class FilmsLisstComment extends AbstractView {

  getTemplate() {
    return createFilmsListCommentTemplate();
  }
}
