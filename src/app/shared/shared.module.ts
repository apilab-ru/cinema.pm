import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StubComponent} from './stub/stub.component';
import {ModalModule} from './modal/modal.module';
import {SpinnerComponent} from './spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule
  ],
  declarations: [
    StubComponent,
    SpinnerComponent
  ],
  exports: [
    ModalModule,
    SpinnerComponent
  ]
})
export class SharedModule {
}
