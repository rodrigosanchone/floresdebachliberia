import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductosComponent } from '../app/componentes/productos/productos.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ContactoComponent } from "./componentes/contacto/contacto.component";
import { DahsboardComponent } from './componentes/dahsboard/dahsboard.component';
import { NoEncontradoComponent } from './componentes/no-encontrado/no-encontrado.component';
import { EditarProductoComponent } from './componentes/editar-producto/editar-producto.component';
import { LoginComponent } from './componentes/login/login.component';
import { AuthGuard } from './guardianes/auth.guard';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';


const routes: Routes = [
  {path:'', component: InicioComponent},
  {path:`inicio`, component: InicioComponent},
  {path:`productos`, component: ProductosComponent},
  {path:`contacto`, component:ContactoComponent},
  {path:'login', component: LoginComponent},
 {path:`dahsboard`, component: DahsboardComponent,canActivate:[AuthGuard]},
 {path:`producto/editar/:id`, component: EditarProductoComponent,canActivate:[AuthGuard]},
 {path:`producto/busqueda/:buscar`, component: BusquedaComponent,canActivate:[AuthGuard]},
  {path:'**', component: NoEncontradoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
