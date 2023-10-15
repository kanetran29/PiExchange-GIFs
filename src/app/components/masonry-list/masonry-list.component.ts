import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { PAGE_SIZE } from 'src/app/constants/giphy.const';
import { GiphyGif } from 'src/app/interfaces/giphy.interface';
import { GiphyStore } from 'src/app/stores/giphy.store';
import { ApiStatus } from 'src/app/types/api-status.type';

@Component({
  selector: 'app-masonry-list',
  templateUrl: './masonry-list.component.html',
  styleUrls: ['./masonry-list.component.scss']
})
export class MasonryListComponent {
  @Output() gifSelected = new EventEmitter<GiphyGif>();
  trendingGIFs$: Observable<GiphyGif[]> = this._store.getTrendingGIFs$;
  apiStatus$: Observable<ApiStatus> = this._store.getTrendingGIFsApiStatus$;
  loadedGIFs: Record<string, boolean> = {};
  currentPage = 0;
  // display a half of the page
  readonly displaySize = PAGE_SIZE / 2;

  constructor(private readonly _store: GiphyStore) {
    this._store.getTrendingGIFs(0);
  }

  randomColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  calcAspectRatio(gif: GiphyGif): string {
    return `${gif.images.original.width}/${gif.images.original.height}`;
  }

  trackByFn(_: number, item: GiphyGif): string {
    return item.id;
  }

  loadNextPage(viewportPage: number): void {
    if (viewportPage % 2 === 1) {
      this.currentPage++;
      this._store.getTrendingGIFs(this.currentPage);
    }
  }

  selectGif(gif: GiphyGif): void {
    this.gifSelected.emit(gif);
  }
}
