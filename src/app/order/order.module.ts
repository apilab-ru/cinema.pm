import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListComponent} from './list/order-list.component';
import {OrderRoutingModule} from './order-routing.module';
import {SharedModule} from '../shared/shared.module';
import {OrderService} from './order.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule
  ],
  providers: [
    OrderService
  ],
  declarations: [
    OrderListComponent
  ]
})
export class OrderModule {
}
