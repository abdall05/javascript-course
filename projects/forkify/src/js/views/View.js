import icons from 'url:../../img/icons.svg'; //parcel importing icons
const cleanIconsURL = icons.split('?')[0];

export default class View {
  _parentElement;
  _data;
  _errorMessage;
  _message;
  render(data, render = true) {
    if (!data) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();
    console.log(markup);
    if (!render) return markup;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  //DOM updating Algorithm
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
  }
  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
    <div class="spinner">
            <svg>
              <use href="${cleanIconsURL}#icon-loader"></use>
            </svg>
    </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${cleanIconsURL}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
            <div>
              <svg>
                <use href="${cleanIconsURL}#icon-smile-triangle"></use>
              </svg>
            </div>
            <p>${message}</p>
          </div>
    `;
    this._parentElement.innerHTML = '';
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
