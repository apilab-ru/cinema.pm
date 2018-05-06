import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderListComponent} from './list/order-list.component';
import {OrderRoutingModule} from './order-routing.module';
import {SharedModule} from '../shared/shared.module';
import {OrderService} from './order.service';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {OrderCreateComponent} from './create/create.component';
import {OrderCreateItemComponent} from './create/item/order-create-item.component';
import { GiveComponent } from './give/give.component';
import {OrderViewComponent} from './view/order-view.component';

@NgModule({
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    OrderService
  ],
  declarations: [
    OrderListComponent,
    OrderCreateComponent,
    OrderCreateItemComponent,
    GiveComponent,
    OrderViewComponent
  ]
})
export class OrderModule {
}
