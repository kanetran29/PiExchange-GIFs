import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GiphyGif } from 'src/app/interfaces/giphy.interface';
import { GiphyStore } from 'src/app/stores/giphy.store';
import { ApiStatus } from 'src/app/types/api-status.type';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.scss']
})
export class TrendingComponent {
  trendingGIFs$: Observable<GiphyGif[]> = this._store.getTrendingGIFs$;
  apiStatus$: Observable<ApiStatus> = this._store.getTrendingGIFsApiStatus$;
  loadedGIFs: Record<string, boolean> = {};
  constructor(private readonly _store: GiphyStore) {
    this._store.getTrendingGIFs(0);
  }

  randomColor(): string {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  }

  trackByFn(_: number, item: GiphyGif): string {
    return item.id;
  }
}
