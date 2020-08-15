import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';
import { AdminComponent } from './components/admin/admin.component';
import { MessageComponent } from './components/message/message.component';
import { FaqComponent } from './components/faq/faq.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent,
    children: [
      {path: 'shop', component: ShopComponent},
      {path: 'home', component: HomeComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
      {path: 'faq', component: FaqComponent},
      {path: 'message', component: MessageComponent, canActivate: [AuthGuard]},
    ]
},
{ path: '**', pathMatch: 'full', redirectTo: 'dashboard/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
