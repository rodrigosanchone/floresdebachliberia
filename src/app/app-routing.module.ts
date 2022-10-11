import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './components/contact/contact.component';
import { DahsboardComponent } from './components/dahsboard/dahsboard.component';
import { EditComponent } from './components/edit/edit.component';
import { ProductsComponent } from './components/products/products.component';
import { StartComponent } from './components/start/start.component';

import { AuthGuard } from './guardians/auth.guard'
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
const routes: Routes = [
  {path:``,component:StartComponent},
  {path: `inicio`,component:StartComponent},
  {path:`productos`,component:ProductsComponent},
  {path:`contacto`, component: ContactComponent },
  {path:`login`, component:LoginComponent},
  {path:`dashboard`, component: DahsboardComponent,canActivate:[AuthGuard] },
  {path:`producto/editar/:id`, component: EditComponent,canActivate:[AuthGuard]},
  {path:'**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
