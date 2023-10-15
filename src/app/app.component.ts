import { Component } from '@angular/core';
import { GiphyGif } from './interfaces/giphy.interface';
import { GiphyStore } from './stores/giphy.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PiExchange-GIFs';
  modalOpen = false;
  selectedGif?: GiphyGif;
  trendingGIFs$ = this._store.getTrendingGIFs$;
  searchedGIFs$ = this._store.getSearchedGIFs$;
  getTrendingGIFsApiStatus$ = this._store.getTrendingGIFsApiStatus$;
  getSearchedGIFsApiStatus$ = this._store.getSearchedGIFsApiStatus$;
  currentMode = 'Trending';
  searchValue = '';
  constructor(private readonly _store: GiphyStore) {
    this._store.getTrendingGIFs(0);
  }

  /**
   * The function updates the search value and mode based on the input value and triggers a search for
   * GIFs.
   * @param {string} value - The value parameter is a string that represents the new search value
   * entered by the user.
   * @returns The function does not explicitly return anything.
   */
  onSearchValueChange(value: string) {
    if (value === '' && this.currentMode === 'Search') {
      this.currentMode = 'Trending';
      return;
    }
    if (this.currentMode === 'Trending') {
      this.currentMode = 'Search';
    }
    this.searchValue = value;
    this._store.searchGIFs(value);
  }

  /**
   * The function "onSelectGif" sets the "modalOpen" variable to true and assigns the selected GIF to
   * the "selectedGif" variable.
   * @param {GiphyGif} gif - The parameter "gif" is of type "GiphyGif". It represents a selected GIF
   * from a Giphy API response.
   */
  onSelectGif(gif: GiphyGif) {
    this.modalOpen = true;
    this.selectedGif = gif;
  }

  /**
   * The function `onLoadNextPage` loads the next page of GIFs based on the current mode (either
   * trending or searched) and the page index.
   * @param {number} pageIndex - The pageIndex parameter is a number that represents the index of the
   * next page to load. It is used to determine which page of GIFs to retrieve from the API.
   */
  onLoadNextPage(pageIndex: number) {
    if (this.currentMode === 'Trending') {
      this._store.getTrendingGIFs(pageIndex);
    } else {
      this._store.loadSearchedGIFsNextPage({
        searchQuery: this.searchValue,
        pageIndex
      });
    }
  }

  /**
   * The closePopup function adds a CSS class to an HTML element to animate it, and then sets a timeout
   * to update some state variables after a certain delay.
   * @param {HTMLElement} element - The `element` parameter is an HTMLElement that represents the popup
   * element that needs to be closed.
   */
  closePopup(element: HTMLElement) {
    element.classList.add('animate__zoomOutDown')
    setTimeout(() => {
      this.modalOpen = false;
      this.selectedGif = undefined;
    }, 500);
  }
}
