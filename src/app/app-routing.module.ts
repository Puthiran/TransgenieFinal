import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { ProductdetailsComponent } from './Components/productdetails/productdetails.component';
import { ProductregisterComponent } from './Components/productdetails/productregister/productregister.component';
import { QueriesComponent } from './Components/queries/queries.component';
import { LoginComponent } from './Components/userpages/login/login.component';
import { SignupComponent } from './Components/userpages/signup/signup.component';
import { UserpagesComponent } from './Components/userpages/userpages.component';
import { VehicledetailsComponent } from './Components/vehicledetails/vehicledetails.component';
import { VehicleregisterComponent } from './Components/vehicledetails/vehicleregister/vehicleregister.component';
import {BaseLayoutComponent} from './Layout/base-layout/base-layout.component';
import {PagesLayoutComponent} from './Layout/pages-layout/pages-layout.component';

const routes: Routes = [{
    path: '',
    component: BaseLayoutComponent,
    children: [
      {path: '', redirectTo: '/pages/login',   pathMatch: 'full'},
      // Dashboads
      {path: 'dashboard', component: UserpagesComponent, data: {extraParameter: 'dashboardsMenu'}},

      //Vehicle Details
      {path: 'vehicle/register', component: VehicleregisterComponent, data: {extraParameter: ''}},
      {path: 'vehicle/viewdetails', component: VehicledetailsComponent, data: {extraParameter: ''}},

      //Product Details
      {path: 'product/register', component: ProductregisterComponent, data: {extraParameter: ''}},
      {path: 'product/viewdetails', component: ProductdetailsComponent, data: {extraParameter: ''}},
      {path: 'queries', component: QueriesComponent, data: {extraParameter: ''}},
    ]
  },
  {
    path: '',
    component: PagesLayoutComponent,
    children: [

      // User Pages
      {path: 'pages/login', component: LoginComponent, data: {extraParameter: ''}},
      {path: 'pages/register', component: SignupComponent, data: {extraParameter: ''}},
      // {path: 'pages/forgot-password', component: ForgotPasswordBoxedComponent, data: {extraParameter: ''}},
    ]
  },
  {path: '**', redirectTo: 'error/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
