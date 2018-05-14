import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule, MatProgressSpinnerModule,
  MatSidenavModule,
  MatToolbarModule
} from '@angular/material';
import {ProfileComponent} from './profile/profile.component';
import {SearchComponent} from './search/search.component';
import {ListComponent} from './list/list.component';
import {CinemasService} from './cinemas.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ProfileService} from './profile.service';
import {CinemaComponent} from './cinema/cinema.component';
import {RouterModule} from '@angular/router';
import {MyNavComponent} from './my-nav/my-nav.component';
import {LayoutModule} from '@angular/cdk/layout';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    MatToolbarModule,
    MatCardModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressBarModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    LayoutModule,
    MatListModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    ProfileComponent,
    SearchComponent,
    ListComponent,
    CinemaComponent,
    MyNavComponent
  ],
  providers: [
    CinemasService,
    ProfileService,
    MyNavComponent
  ],
  exports: [
    MatToolbarModule,
    ProfileComponent,
    MyNavComponent,
    MatProgressSpinnerModule
  ]
})
export class SharedModule {
}
