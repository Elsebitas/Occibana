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
    return this.http.post(this.url2 + 'postCerrarSesion', usuario);
  }

}
