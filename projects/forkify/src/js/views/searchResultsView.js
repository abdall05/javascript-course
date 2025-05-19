import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel importing icons
const cleanIconsURL = icons.split('?')[0];

class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query. Please try again!';
  //   _message = '';

  _generateMarkup() {
    console.log(this._data);
    return this._data.map(this._generateMarkupResult).join('');
  }
  _generateMarkupResult(result) {
    const id = location.hash.slice(1);
    return `
        <li class="preview">
            <a class="preview__link ${
              id === result.id ? 'preview__link--active' : ''
            }" href="#${result.id}">
              <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${result.title}</h4>
                <p class="preview__publisher">${result.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="${cleanIconsURL}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>

    `;
  }
}
export default new SearchResultsView();
