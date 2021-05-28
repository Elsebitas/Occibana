import { ListasMunicipios } from './../_model/ListasMunicipios';
import { ListasZonas } from './../_model/ListasZonas';
import { MisReservas } from './../_model/MisReservas';
import { ObtenerComentarios } from './../_model/ObtenerComentarios';
import { Observable } from 'rxjs';
import { HotelesPrincipales } from './../_model/HotelesPrincipales';
import { HotelesDestacados } from './../_model/HotelesDestacados';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

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
    return this.http.get<ListasZonas[]>(`${this.url}getListasZonas`);
  }

  getListasMunicipios(){
    return this.http.get<ListasMunicipios[]>(`${this.url}getListasMunicipios`);
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
  postHolelesPrincipales(hotelesPrincipales:HotelesPrincipales): Observable<HotelesPrincipales[]>{
    return this.http.post<HotelesPrincipales[]>(this.url + 'postHotelesPrincipal', hotelesPrincipales)
  }
  /**
   * Método que recibe el objeto de la clase ObtenerComentarios.
   * 
   * @param obtenerComentarios recibe el objeto ObtenerComentarios.
   * @returns la respuesta del servicio.
   */
  postObtenerComentarios(hotelesPrincipales:HotelesPrincipales): Observable<any>{
    return this.http.post<any>(this.url + 'postObtenerComentarios', hotelesPrincipales) 
  }

  postMostrarMisreservas(misReservas: MisReservas): Observable<any> {
    return this.http.post<any>(this.url + 'postMostrarMisreservas', misReservas)
  }

  postCancelarMireserva(id: number): Observable<any> {
    return this.http.post<any>(this.url + 'postCancelarMireserva', id)
  }

}
