import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';

const routes: Routes = [
  {path:"oferta", component:OfertaComponent},
  {path:"ofertaGestion", component:OfertaGestionComponent},
  {path:"oferta-form/:id", component:OfertaFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
