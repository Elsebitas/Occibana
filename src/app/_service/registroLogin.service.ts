import { RecuperarContrasena } from './../_model/RecuperarContrasena';
import { RegistroUsuarios } from './../_model/RegistroUsuarios';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Login } from '../_model/Login';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * Variable constante que especifica el tipo de archivo que se quiere enviar.
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que implementa todos los servicios del apartado registroLogin.
 */
export class RegistroLoginService {

  /**
   * Variable que almacena la URL.
   */
  private url: string = `${environment.HOST}/registroLogin/`;

  //Variable provicional
  private url2: string = `${environment.HOST}/perfil/`;


  private url3: string = `${environment.HOST}/admin/`;


  /**
   * Constructor que inicializa el objeto http.
   * 
   * @param http recibe el objeto HttpClient.
   */
  constructor( private http: HttpClient) { }

  /**
   * Método que recibe el objeto de la clase Login.
   * 
   * @param login recibe el objeto Login.
   * @returns la respuesta del servicio.
   */
  postIngresoLogin(login: Login): Observable<any> {
    return this.http.post<any>(this.url + 'postIngresoLogin', login, httpOptions);
  }

  /**
   * Método que recibe el parámetro del usuario.
   * 
   * @param usuario recibe el usuario.
   * @returns la respuesta del servicio.
   */
  postCerrarSesion(usuario: string) {
    return this.http.post(this.url2 + 'postCerrarSesion', usuario, httpOptions);
  }

  estaLogueado(): number {
    let token = sessionStorage.getItem(environment.TOKEN);
    if(token != null){
      const helper = new JwtHelperService();
      const isExpired = helper.isTokenExpired(token);
      if(isExpired == true){
        console.log("TOKEN EXPIRADO");
        return 2;
      }else{
        console.log("TOKEN VALIDO");
        return 1;
      }
    }else{
      return 0;
    }
  }

  postRegistroUsuarios(registroUsuarios: RegistroUsuarios): Observable<any> {
    return this.http.post<any>(this.url + 'postRegistroUsuario', registroUsuarios, httpOptions);
  }

  postRecuperarConstrasena(recuperarContrasena: RecuperarContrasena): Observable<any> {
    return this.http.post<any>(this.url3 + 'postCorreoRecuperacion', recuperarContrasena, httpOptions);
  }

  
}

