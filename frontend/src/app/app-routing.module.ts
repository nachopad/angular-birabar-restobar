import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';

const routes: Routes = [
  {path:"", redirectTo:"principal",pathMatch:"full"},
  { path: 'principal', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroClienteComponent },
  { path: 'login', component: LoginComponent }, 
  {path: 'alta-categoria/:id', component: CategoriaFormComponent},
  {path:'alta-producto/:id', component:ProductoFormComponent},
  {path:"oferta", component:OfertaComponent},
  {path:"ofertaGestion", component:OfertaGestionComponent},
  {path:"oferta-form/:id", component:OfertaFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }
