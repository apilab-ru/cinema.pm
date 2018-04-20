import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StubComponent} from './stub/stub.component';


const routes: Routes = [
  {path: '', component: StubComponent},
  {path: 'order/create', component: StubComponent},
  {path: 'order/issue', component: StubComponent},
  {path: 'order/return', component: StubComponent},
  {path: 'order/list/today', component: StubComponent},
  {path: 'order/list', component: StubComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
