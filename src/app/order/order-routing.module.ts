import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StubComponent} from '../shared/stub/stub.component';
import {OrderListComponent} from './list/order-list.component';

const routes: Routes = [
  {path: 'create', component: StubComponent},
  {path: 'issue', component: StubComponent},
  {path: 'return', component: StubComponent},
  {path: 'list/today', component: OrderListComponent},
  {path: 'list', component: OrderListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule {
}
