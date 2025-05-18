import * as model from './model.js';
import recipeView from './views/recipeView.js';
//polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const controlRecipes = async function () {
  //subscriber
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    await model.loadRecipe(id);
    const { recipe } = model.state;
    //2-Rendering recipe
    recipeView.render(recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

// const renderRecipe = function (recipe) {};

//Listen for hashchange event (link changes) + load event

// window.addEventListener('hashchange', async function () {
//   const recipeId = window.location.hash.slice(1);
//   getRecipe(recipeId);
// });

//load event ; /id

const init = function () {
  recipeView.addHandlerRender(controlRecipes); // subscribe controlRecipes to publisher (addHandlerRender)
};

init();
