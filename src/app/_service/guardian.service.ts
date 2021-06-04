import { ProgressbarService } from './progressbar.service';
import { CryptoService } from './crypto.service';
import { Observable } from 'rxjs';
import { Login } from './../_model/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { RegistroLoginService } from './registroLogin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {


  constructor(private RegistroLoginService: RegistroLoginService,
    private router: Router,
    private crypto: CryptoService,
    private login: Login,
    private progressbarService: ProgressbarService
  ) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    let respuesta = this.RegistroLoginService.estaLogueado();
    let intentos = 0;
    if (respuesta == 1 || respuesta == 2) {
      if (respuesta == 2) {
        this.progressbarService.barraProgreso.next("1");
        this.reLogin();
        while (true) {
          await this.delay(2000);
          respuesta = this.RegistroLoginService.estaLogueado();
          if (respuesta == 1) {
            this.progressbarService.barraProgreso.next("2");
            break;
          }
          intentos++;
          if (intentos == 3) {
            this.progressbarService.barraProgreso.next("2");
            //console.log("INTENTO 3");
            this.RegistroLoginService.postCerrarSesion(usuario);
            return false;
          }
        }
      }

      let token = sessionStorage.getItem(environment.TOKEN);
      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(token);
      let rol = decodedToken.role;

      let url = state.url;
      if (url.includes('/perfil') && (rol == 1 || rol == 0))
        return true;
      else {
        this.router.navigate(['/login']);
      }

    } else {
      this.router.navigate(['/error401']);
    }
    return false;
  }
  reLogin() {
    this.login = new Login();
    this.login.Usuario = this.crypto.decryptUsingAES256("user");
    this.login.Contrasena = this.crypto.decryptUsingAES256("userpassword");
    this.RegistroLoginService.postIngresoLogin(this.login).subscribe(data => {
      //console.log(data);
      sessionStorage.setItem(environment.TOKEN, data);
    });
    //console.log("TOKEN RENOVADO");
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
