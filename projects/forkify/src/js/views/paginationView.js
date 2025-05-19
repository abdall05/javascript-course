import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel importing icons
const cleanIconsURL = icons.split('?')[0];
class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');
  _generateMarkup() {
    return `
    ${
      this._data.left
        ? `<button class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${cleanIconsURL}#icon-arrow-left"></use>
            </svg>
            <span>Page ${this._data.left}</span>
          </button>`
        : ''
    }
    ${
      this._data.right
        ? `<button class="btn--inline pagination__btn--next">
            <svg class="search__icon">
              <use href="${cleanIconsURL}#icon-arrow-right"></use>
            </svg>
            <span>Page ${this._data.right}</span>
          </button>`
        : ''
    }
    
    `;
  }
  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const button = e.target.closest('button');
      if (!button) return;
      console.log(button);
      if (button.classList.contains('pagination__btn--next')) {
        handler('next');
      }
      if (button.classList.contains('pagination__btn--prev')) {
        handler('prev');
      }
    });
  }
}

export default new PaginationView();
