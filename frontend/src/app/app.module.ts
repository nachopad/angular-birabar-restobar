import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginService } from './services/login.service';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { RegistroClienteComponent } from './components/registro-cliente/registro-cliente.component';
import { ProductoFormComponent } from './components/producto-form/producto-form.component';
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { CategoriaFormComponent } from './components/categoria-form/categoria-form.component';
import { OfertaComponent } from './components/oferta/oferta.component';
import { OfertaGestionComponent } from './components/oferta-gestion/oferta-gestion.component';
import { OfertaFormComponent } from './components/oferta-form/oferta-form.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { PerfilUsuarioComponent } from './components/perfil-usuario/perfil-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    RegistroClienteComponent,
    ProductoFormComponent,
    GestionProductosComponent,
    CategoriaFormComponent,
    OfertaComponent,
    OfertaGestionComponent,
    OfertaFormComponent,
    FooterComponent,
    PerfilUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    LoginService, 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
