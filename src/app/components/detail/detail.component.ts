import { Component, Input } from '@angular/core';
import { GiphyGif } from 'src/app/interfaces/giphy.interface';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  @Input() gif?: GiphyGif;
  calcAspectRatio(gif: GiphyGif): string {
    return `${gif.images.original.width}/${gif.images.original.height}`;
  }

}
