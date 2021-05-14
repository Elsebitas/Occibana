import { Login } from './_model/Login';
import { MaterialModule } from './material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Error404Component } from './pages/error404/error404.component';
import { FiltroHotelesPipe } from './_pipes/filtro-hoteles.pipe';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { HotelComponent } from './pages/hotel/hotel.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { Error401Component } from './pages/error401/error401.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';

/**
 * Modulo donde se realizan importaciones de funcionalidad.
 * 
 * @module NgModule
 */
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    InicioComponent,
    Error404Component,
    FiltroHotelesPipe,
    HotelComponent,
    PerfilComponent,
    Error401Component,
    MisReservasComponent,
        
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [
   Login
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
