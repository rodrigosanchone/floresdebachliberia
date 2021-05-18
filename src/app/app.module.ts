import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{environment } from '../environments/environment';
import{AngularFireModule} from '@angular/fire';
import{AngularFirestoreModule,SETTINGS} from '@angular/fire/firestore';
import{AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule,BUCKET} from '@angular/fire/storage';
import { AppRoutingModule } from './app-routing.module';
import{FlashMessagesModule} from 'angular2-flash-messages';
import{FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { ProductosComponent } from './componentes/productos/productos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { ProductosService } from './servicios/productos.service';
import { ContactoComponent } from './componentes/contacto/contacto.component';
import { DahsboardComponent } from './componentes/dahsboard/dahsboard.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { LoginComponent } from './componentes/login/login.component';
import { LoginServices } from './servicios/login.services';
import { MensajeService} from './servicios/mensajes.services';
import { AuthGuard } from './guardianes/auth.guard';
import { HttpClientModule } from '@angular/common/http';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ProductosComponent,
    InicioComponent,
    FooterComponent,
   ContactoComponent,
   DahsboardComponent,
   NoEncontradoComponent,
   EditarProductoComponent,
   LoginComponent,
   BusquedaComponent,
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore,'floresdebachproductos2'),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    FormsModule,
    HttpClientModule,
    FlashMessagesModule.forRoot()
  ],
  providers: [ProductosService,
    LoginServices,
    MensajeService,
    AuthGuard,
  {provide: BUCKET,useValue: 'floresdebachproductos2.appspot.com'},
   {provide: SETTINGS,useValue:{}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
