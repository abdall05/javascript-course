import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchResultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
//polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

if (module.hot) {
  //Parcel feature
  module.hot.accept();
}
const controlRecipes = async function () {
  //subscriber
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    searchResultsView.render(model.getSearchResultsPage());
    bookmarksView.render(model.state.bookmarks);
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2-Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    const query = searchView.getQuery();
    if (!query) return;
    searchResultsView.renderSpinner();
    await model.loadSearchResults(query);
    searchResultsView.render(model.getSearchResultsPage());
    controlPagination();
  } catch (err) {
    console.log(err);
  }
};
const controlPagination = function () {
  const currentPage = model.state.search.currentPage;
  const resultPerPage = model.state.search.resultsPerPage;
  const resultsNum = model.state.search.results.length;
  const maxPages = Math.ceil(resultsNum / resultPerPage);
  const prevPage = currentPage - 1 > 0 ? currentPage - 1 : undefined;
  const nextPage = currentPage + 1 <= maxPages ? currentPage + 1 : undefined;
  paginationView.render({ left: prevPage, right: nextPage });
};
const controlPaginationHandler = function (action) {
  if (action === 'prev') model.setSeachPage(model.state.search.currentPage - 1);
  if (action === 'next') model.setSeachPage(model.state.search.currentPage + 1);
  searchResultsView.render(
    model.getSearchResultsPage(model.state.search.currentPage)
  );
  controlPagination();
};

const controlServings = function (action) {
  if (action == 'increase') {
    model.updateServings(model.state.recipe.servings + 1);
  }
  if (action == 'decrease') {
    model.updateServings(model.state.recipe.servings - 1);
  }
  recipeView.render(model.state.recipe);
};

const controlBookmark = function () {
  model.toggleBookmark(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes); // subscribe controlRecipes to publisher (addHandlerRender)
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerPagination(controlPaginationHandler);
};

init();
