import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';

const routes: Routes = [
  {path:"", redirectTo:"principal",pathMatch:"full"},
  { path: 'principal', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroClienteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
