import { ObtenerComentarios } from './../_model/ObtenerComentarios';
import { Observable } from 'rxjs';
import { HotelesPrincipales } from './../_model/HotelesPrincipales';
import { HotelesDestacados } from './../_model/HotelesDestacados';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Listas } from '../_model/Listas';

/**
 * Variable constante que especifica el tipo de archivo que se quiere enviar.
 */
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',  
  })
};

@Injectable({
  providedIn: 'root'
})
/**
 * Servicio que implementa todos los servicios del apartado listas.
 */
export class ListasService {

  /**
   * Variable que almacena la URL.
   */
  private url: string = `${environment.HOST}/listas/`;

  /**
   * Constructor que inicializa el objeto http.
   * 
   * @param http recibe el objeto HttpClient.
   */
  constructor(private http: HttpClient) { }

  /**
   * Método que retorna el servicio getListasZonas.
   * 
   * @returns un arreglo del servicio getListasZonas.
   */
  getListasZonas(){
    return this.http.get<Listas[]>(`${this.url}getListasZonas`);
  }

  /**
   * Método que retorna el servicio getHotelesDestacados.
   * 
   * @returns un arreglo del servicio getHotelesDestacados.
   */
  getHotelesDestacados(){
    return this.http.get<HotelesDestacados[]>(`${this.url}getHotelesDestacados`);
  }

  /**
   * Método que recibe el objeto de la clase HotelesPrincipales.
   * 
   * @param hotelesPrincipales recibe el objeto HotelesPrincipales.
   * @returns la respuesta del servicio.
   */
  postHolelesPrincipales(hotelesPrincipales:HotelesPrincipales): Observable<any>{
    return this.http.post<any>(this.url + 'postHotelesPrincipal', hotelesPrincipales, httpOptions)

  }
  /**
   * Método que recibe el objeto de la clase ObtenerComentarios.
   * 
   * @param obtenerComentarios recibe el objeto ObtenerComentarios.
   * @returns la respuesta del servicio.
   */
  postObtenerComentarios(obtenerComentarios: ObtenerComentarios): Observable<any>{
    return this.http.post<any>(this.url + 'postObtenerComentarios', obtenerComentarios, httpOptions) 
  }

}
