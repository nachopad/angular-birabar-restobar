import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';

const routes: Routes = [
  {path:"", redirectTo:"alta-producto/:id",pathMatch:"full"},
  { path: 'principal', component: HomeComponent},
  { path: 'login', component: LoginComponent }, 
  {path: 'alta-categoria/:id', component: CategoriaFormComponent},
  {path:'alta-producto/:id', component:ProductoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
