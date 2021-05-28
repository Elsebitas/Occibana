import { ActualizarContrasenaComponent } from './pages/perfil/actualizar-contrasena/actualizar-contrasena.component';
import { ActualizarContrasena } from './_model/ActualizarContrasena';
import { RegistroLoginService } from './_service/registroLogin.service';
import { Login } from './_model/Login';
import { environment } from './../environments/environment';
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
import { HotelComponent } from './pages/hotel/hotel.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { Error401Component } from './pages/error401/error401.component';
import { MisReservasComponent } from './pages/mis-reservas/mis-reservas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogoElimReservaComponent } from './pages/mis-reservas/dialogo-elim-reserva/dialogo-elim-reserva.component';
import { EditarPerfilComponent } from './pages/perfil/editar-perfil/editar-perfil.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { CryptoService } from './_service/crypto.service';
import { ProgressbarService } from './_service/progressbar.service';
import { Router, RouterStateSnapshot } from '@angular/router';
import { ComentarCalificarComponent } from './pages/comentar-calificar/comentar-calificar.component';

/**
 * Modulo donde se realizan importaciones de funcionalidad.
 * 
 * @module NgModule
 */
export function jwtOptionsFactory(RegistroLoginService, ProgressbarService, login,crypto) {
  return {
    tokenGetter: async () => {
      let usuario = sessionStorage.getItem(environment.TOKEN);
      let respuesta = RegistroLoginService.estaLogueado();
      let intentos = 0;
      if (respuesta == 1 || respuesta == 2) {
        if (respuesta == 2) {
          ProgressbarService.barraProgreso.next("1");
          //relogin
          login = new Login();
          login.Usuario = crypto.decryptUsingAES256("user");
          login.Contrasena = crypto.decryptUsingAES256("userpassword");
          RegistroLoginService.postIngresoLogin(login).subscribe(data => {
            console.log(data);
            sessionStorage.setItem(environment.TOKEN, data);
          });
          //////////////
          while (true) {
            //progressbarService.delay();
            await delay(2000);
            respuesta = RegistroLoginService.estaLogueado();
            if (respuesta == 1) {
              ProgressbarService.barraProgreso.next("2");
              break;
            }
            intentos++;
            if (intentos == 3) {
              ProgressbarService.barraProgreso.next("2");
              RegistroLoginService.postCerrarSesion(usuario);
              return null;
            }
          }
        }

        let tk = sessionStorage.getItem(environment.TOKEN);
        return tk != null ? tk : '';
      } else {
        return null;
      }
    },
    allowedDomains: ["18.230.178.121:8081"], ///TAMBIEN CAMBIAR IP AQUI
    disallowedRoutes: ["http://18.230.178.121:8081/api/registroLogin/postRegistroUsuario",
      "http://18.230.178.121:8081/api/registroLogin/postIngresoLogin",
      "http://18.230.178.121:8081/api/listas/postHotelesPrincipal",
      "http://18.230.178.121:8081/api/listas/postObtenerComentarios",
      "http://18.230.178.121:8081/api/panelHotel/postInformacionDelHotel",
      "http://18.230.178.121:8081/api/panelHotel/postInformacionDelHabitacion",
      "http://18.230.178.121:8081/api/panelHotel/postBuscarDisponibilidadHotel",
      "http://18.230.178.121:8081/api/panelHotel/postReservarHospedaje",
    ],
  }
}
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
    DialogoElimReservaComponent,
    EditarPerfilComponent,
    ActualizarContrasenaComponent,
    ComentarCalificarComponent    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [RegistroLoginService, ProgressbarService, Login, CryptoService]
      }
    })
  ],
  providers: [
    Login,
    AppModule,
    RegistroLoginService,
    ProgressbarService,
    CryptoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
function delay(arg0: number) {
  return new Promise(resolve => setTimeout(resolve, arg0));
}

