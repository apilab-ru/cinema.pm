import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {SharedModule} from './shared/shared.module';
import {environment} from '../environments/environment';
import {HttpClientModule} from '@angular/common/http';
import {UserService} from './user/user.service';
import {UserModule} from './user/user.module';
import {SpinnerService} from './shared/spinner.service';
import {ClientsService} from './clients.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    UserModule
  ],
  providers: [
    {provide: 'API', useValue: environment.apiUrl},
    UserService,
    SpinnerService,
    ClientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
