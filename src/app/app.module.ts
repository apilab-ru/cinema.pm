import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { ProfileComponent } from './shared/profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {SharedModule} from './shared/shared.module';
import { SearchComponent } from './shared/search/search.component';
import { ListComponent } from './shared/list/list.component';

@NgModule({
  imports: [
    SharedModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    RouterModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
