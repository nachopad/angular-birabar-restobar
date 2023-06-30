import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { GestionCategoriaProductoComponent } from './components/gestion-categoria-producto/gestion-categoria-producto.component';
import { ListaProductosComponent } from './components/lista-productos/lista-productos.component';


const routes: Routes = [
  {path:"", redirectTo:"gestion-productos",pathMatch:"full"},
  { path: 'principal', component: HomeComponent},
  { path: 'login', component: LoginComponent }, 
  {path: 'alta-categoria/:id', component: CategoriaFormComponent},
  {path:'alta-producto/:id', component:ProductoFormComponent},
  {path:"oferta", component:OfertaComponent},
  {path:"ofertaGestion", component:OfertaGestionComponent},
  {path:"oferta-form/:id", component:OfertaFormComponent},
  {path:'gestion-productos', component:GestionProductosComponent},
  {path:'gestion-categoria-producto/:id', component:GestionCategoriaProductoComponent},
  {path:'lista-productos', component:ListaProductosComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
  
export class AppRoutingModule { }
