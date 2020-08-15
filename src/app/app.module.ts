import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment'

import { ToastrModule } from 'ngx-toastr';

import { AngularFireModule } from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage'
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthGuard } from './auth.guard';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { RatingModule } from 'ngx-bootstrap/rating';

import { CatalogService } from './services/catalog.service';
import { AuthService } from './services/auth.service';

export const config = environment.config;

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ShopComponent } from './components/shop/shop.component';
import { CardComponent } from './components/card/card.component';
import { AdminComponent } from './components/admin/admin.component';
import { MessageComponent } from './components/message/message.component';
import { FaqComponent } from './components/faq/faq.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomeComponent,
    NavbarComponent,
    ShopComponent,
    CardComponent,
    AdminComponent,
    MessageComponent,
    FaqComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    AccordionModule.forRoot(),
    ButtonsModule.forRoot(),
    TooltipModule.forRoot(),
    BsDatepickerModule.forRoot(),
    CollapseModule.forRoot(),
    ModalModule.forRoot(),
    TabsModule.forRoot(),
    CarouselModule.forRoot(),
    ProgressbarModule.forRoot(),
    RatingModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [CatalogService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
