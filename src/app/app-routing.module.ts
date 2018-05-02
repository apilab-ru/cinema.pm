import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StubComponent} from './shared/stub/stub.component';


const routes: Routes = [
  // {path: '', component: StubComponent},
  {path: 'order', loadChildren: './order/order.module#OrderModule'},
  { path: '',
    redirectTo: 'order',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
