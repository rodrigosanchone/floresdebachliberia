import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import{FormsModule,ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule,SETTINGS } from '@angular/fire/compat/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { StartComponent } from './components/start/start.component';
import { FooterComponent } from './components/footer/footer.component';
import { Products } from './services/products.services';
import { ProductsComponent } from './components/products/products.component';
import { ContactComponent } from './components/contact/contact.component';
import { DahsboardComponent } from './components/dahsboard/dahsboard.component';
import { EditComponent } from './components/edit/edit.component';
import { AuthGuard } from './guardians/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { LoginServices } from './services/login.services';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ErrorComponent } from './components/error/error.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    StartComponent,
    FooterComponent,
    ProductsComponent,
    ContactComponent,
    DahsboardComponent,
    EditComponent,
    LoginComponent,
    ErrorComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore,'floresdebachproductos2'),
    AngularFirestoreModule,
    FormsModule,
    ReactiveFormsModule,
    
    /* FlashMessagesModule.forRoot(), */
   
     
  ],
  providers: [
    Products,
    AuthGuard,
    LoginServices,
    {provide:SETTINGS,useValue:{}},
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
