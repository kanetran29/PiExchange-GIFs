import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { TrendingComponent } from './components/trending/trending.component';
import { PureWrapperPipe } from './pipes/pure-wrapper.pipe';
const components = [
  AppComponent,
  TrendingComponent,
  HeaderComponent,
  FooterComponent
]
const pipes = [PureWrapperPipe]
@NgModule({
  declarations: [
    ...components
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    ...pipes
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
