const getUserStatus = (count) => {
  if (count <= 10) {
    return `Novice`;
  } else if (count <= 20) {
    return `Fan`;
  } else {
    return `Movie Buff`;
  }
};

export const createProfileTemplate = (historyCount) => {
  const userStatus = getUserStatus(historyCount);
  return `<section class="header__profile profile">
  ${historyCount !== 0 ? `<p class="profile__rating">${userStatus}</p>` : ``}
  <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
</section>`;
};
