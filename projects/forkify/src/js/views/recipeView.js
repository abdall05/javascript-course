import View from './View.js';
import icons from 'url:../../img/icons.svg'; //parcel importing icons
//url will change after compiling
import fracty from 'fracty';
import { version } from 'core-js';
const formatQuantity = function (quantity) {
  if (!quantity) return '';
  return fracty(quantity);
};
const cleanIconsURL = icons.split('?')[0];
//later we will have a parent View Class
class RecipeView extends View {
  _parentElement = document.querySelector('.recipe');
  _errorMessage = 'No recipes found for your query. Please try again!';
  _message = '';

  addHandlerRender(handler) {
    //publisher will be called by controller
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerServings(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const button = e.target.closest('.btn--tiny');
      if (!button) return;
      if (button.classList.contains('btn--increase-servings')) {
        handler('increase');
      }
      if (button.classList.contains('btn--decrease-servings')) {
        handler('decrease');
      }
    });
  }
  addHandlerBookmark(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const button = e.target.closest('.btn--bookmark');
      if (!button) return;
      handler();
    });
  }

  _generateMarkup() {
    return `
            <figure class="recipe__fig">
          <img src="${this._data.image}" alt="${
      this._data.title
    }" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${this._data.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              this._data.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              this._data.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--decrease-servings">
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
          <button class="btn--round btn--bookmark">
            <svg class="">
              <use href="${cleanIconsURL}#icon-bookmark${
      this._data.bookmarked ? '-fill' : ''
    }"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._data.ingredients.map(this._generateMarkupIngrediant).join('')}
            

          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              this._data.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href="${this._data.sourceUrl}"
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="src/img/icons.svg#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
    
    
    `;
  }
  _generateMarkupIngrediant(ingredient) {
    return `
            <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${formatQuantity(
                ingredient.quantity
              )}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ingredient.unit || ''}</span>
                ${ingredient.description}
              </div>
            
            </li>
            `;
  }
}

export default new RecipeView();
