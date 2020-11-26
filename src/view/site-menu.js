const createFilterTemplate = (filter) => {
  const {name, count} = filter;
  const nameUpperLetter = name[0].toUpperCase() + name.slice(1);
  const filterName = name === `all` ? nameUpperLetter + ` movies` : nameUpperLetter;
  const isCount = name !== `all` ? `<span class="main-navigation__item-count">${count}</span>` : ``;
  return `<a href="#${name}" class="main-navigation__item">${filterName} ${isCount}</a>`;
};

const createSiteMenuTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterTemplate(filter, index === 0))
    .join(``);

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      ${filterItemsTemplate}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export {createSiteMenuTemplate};
