import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';

@NgModule({
  declarations: [
    AppComponent,
    OfertaComponent,
    OfertaGestionComponent,
    OfertaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
