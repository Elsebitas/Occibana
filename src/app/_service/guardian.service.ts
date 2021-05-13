import { Observable } from 'rxjs';
import { Login } from './../_model/Login';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { RegistroLoginService } from './registroLogin.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardianService implements CanActivate {

  login: Login;

  constructor(private RegistroLoginService: RegistroLoginService, private router: Router) { }

  

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    let respuesta = this.RegistroLoginService.estaLogueado();
    let intentos = 0;
    if(respuesta == 1 || respuesta == 2) {
      if(respuesta == 2) {
        this.reLogin(this.login);
        while(true) {
            respuesta = this.RegistroLoginService.estaLogueado();
            if(respuesta == 1) {
              break;
            }
            intentos++;
            if(intentos == 3) {
              console.log("INTENTO 3");
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
      if(url.includes('/perfil') && rol == 1)
          return true;
      else {
          this.router.navigate(['401Invalid']);
      }

    } else {
      this.router.navigate(['loginReal']);
    } 
    return false;
  }
  reLogin(login: Login): void{  
    this.RegistroLoginService.postIngresoLogin(login).subscribe(data =>{
      console.log(data);
      sessionStorage.setItem(environment.TOKEN, data);
    });
    console.log("TOKEN RENOVADO");
  }
  
}
