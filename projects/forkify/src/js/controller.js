//polyfill
import 'core-js/stable';
import 'regenerator-runtime/runtime';

import icons from 'url:../img/icons.svg'; //parcel importing icons
//url will change after compiling
const cleanIconsURL = icons.split('?')[0];

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
const RECIPE_BASE_URL = `https://forkify-api.jonas.io/api/v2/recipes`;
const renderSpinner = function (parentEl) {
  const html = `
  <div class="spinner">
          <svg>
            <use href="${cleanIconsURL}#icon-loader"></use>
          </svg>
  </div>
  `;
  parentEl.innerHTML = '';
  parentEl.insertAdjacentHTML('afterbegin', html);
};

const getRecipe = async function (id) {
  if (!id) return;
  const recipeUrl = `${RECIPE_BASE_URL}/${id}`;
  try {
    renderSpinner(recipeContainer);
    const res = await fetch(recipeUrl);
    if (!res.ok) throw Error('Error while fetching recipe');
    const data = await res.json();
    let { recipe } = data.data;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };

    //2-Rendering recipe
    const html = `
            <figure class="recipe__fig">
          <img src="${recipe.image}" alt="${
      recipe.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipe.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href=${cleanIconsURL}#icon-minus-circle></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="${cleanIconsURL}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="${cleanIconsURL}#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${cleanIconsURL}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${recipe.ingredients
            .map(
              ingredient =>
                `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ingredient.quantity ?? ''}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit}</span>
                ${ingredient.description}
              </div>
            
            </li>
            `
            )
            .join('')}
            

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${recipe.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    
    
    `;
    recipeContainer.innerHTML = '';
    recipeContainer.insertAdjacentHTML('afterbegin', html);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// const renderRecipe = function (recipe) {};

//Listen for hashchange event (link changes) + load event
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, async function () {
    const recipeId = window.location.hash.slice(1);
    console.log(recipeId);
    getRecipe(recipeId);
  })
);
// window.addEventListener('hashchange', async function () {
//   const recipeId = window.location.hash.slice(1);
//   getRecipe(recipeId);
// });

//load event ; /id
