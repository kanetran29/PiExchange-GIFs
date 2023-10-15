import { Component } from '@angular/core';
import { GiphyGif } from './interfaces/giphy.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'PiExchange-GIFs';
  modalOpen = false;
  selectedGif?: GiphyGif;
  onSelectGif(gif: GiphyGif) {
    this.modalOpen = true;
    this.selectedGif = gif;
  }
  closePopup(element: HTMLElement) {
    element.classList.add('animate__zoomOutDown')
    setTimeout(() => {
      this.modalOpen = false;
      this.selectedGif = undefined;
    }, 500);
  }
}
