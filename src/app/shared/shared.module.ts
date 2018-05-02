import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StubComponent} from './stub/stub.component';
import {ModalModule} from './modal/modal.module';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [
    StubComponent
  ],
  exports: [
    ModalModule
  ]
})
export class SharedModule {
}
