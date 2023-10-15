import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() currentMode: string;
  @Output() searchValue = new EventEmitter<string>();
  inputForm: FormControl = new FormControl('');

  ngOnInit(): void {
    // No need to unsubscribe because this component is destroyed when the app is closed
    this.inputForm.valueChanges.pipe(debounceTime(300)).subscribe((value) => {
      this.searchValue.emit(value.trim());
    });
  }
}
