import previewView from './previewView';
import View from './View';
import icons from 'url:../../img/icons.svg'; //parcel importing icons
const cleanIconsURL = icons.split('?')[0];

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it :)';

  render(data, render = true) {
    if (Array.isArray(data) && data.length === 0) return super.renderError();
    super.render(data, render);
  }
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}
export default new BookmarksView();
