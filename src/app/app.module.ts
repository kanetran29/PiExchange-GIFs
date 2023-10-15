import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DetailComponent } from './components/detail/detail.component';
import { HeaderComponent } from './components/header/header.component';
import { MasonryListComponent } from './components/masonry-list/masonry-list.component';
import { ScrolledPastViewPortDirective } from './directives/scrolled-past-viewport.directive';
import { PureWrapperPipe } from './pipes/pure-wrapper.pipe';
const components = [
  AppComponent,
  MasonryListComponent,
  HeaderComponent,
  DetailComponent
];
const pipes = [PureWrapperPipe];
const directives = [ScrolledPastViewPortDirective];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    ...pipes,
    ...directives,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
