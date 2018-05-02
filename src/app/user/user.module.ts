import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserAuthComponent} from './auth/auth.component';
import {UserComponent} from './user.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    UserComponent,
    UserAuthComponent
  ],
  exports: [
    UserComponent,
    UserAuthComponent
  ]
})
export class UserModule { }
