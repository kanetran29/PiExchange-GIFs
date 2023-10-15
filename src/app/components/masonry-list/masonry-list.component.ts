import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PAGE_SIZE } from 'src/app/constants/giphy.const';
import { GiphyGif } from 'src/app/interfaces/giphy.interface';

@Component({
  selector: 'app-masonry-list',
  templateUrl: './masonry-list.component.html',
  styleUrls: ['./masonry-list.component.scss']
})
export class MasonryListComponent {
  @Input() GIFs: GiphyGif[] = [];
  @Output() gifSelected = new EventEmitter<GiphyGif>();
  @Output() loadNextPage = new EventEmitter<number>();
  currentPage = 0;
  // display a half of the page
  readonly displaySize = PAGE_SIZE / 2;

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

  onPastViewport(viewportPage: number): void {
    if (viewportPage % 2 === 1) {
      this.currentPage++;
      this.loadNextPage.emit(this.currentPage);
    }
  }

  selectGif(gif: GiphyGif): void {
    this.gifSelected.emit(gif);
  }
}
