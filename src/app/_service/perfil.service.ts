import { ReactivarCuenta } from './../_model/ReactivarCuenta';
import { AgregarImagen } from './../_model/AgregarImagen';
import { AgregarHabitacion } from './../_model/AgregarHabitacion';
import { ComprarMembresias } from './../_model/ComprarMembresias';
import { TraerMensajeDatosPerfil } from './../_model/TraerMensajeDatosPerfil';
import { ActualizarContrasena } from './../_model/ActualizarContrasena';
import { ActualizarDatosPerfil } from './../_model/ActualizarDatosPerfil';
import { ProgressbarService } from './progressbar.service';
import { CargarDatosPerfil } from './../_model/CargarDatosPerfil';
import { DatosPerfil } from '../_model/DatosPerfil';
import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

/*const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Bearer '+sessionStorage.getItem(environment.TOKEN) 
  })

};*/

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  
  private url: string = `${environment.HOST}/perfil/`;
  private url2: string = `${environment.HOST}/agregar_habitacion/`;

  constructor(private http: HttpClient) { }

  postCargarDatosPerfil(datosPerfil: DatosPerfil): Observable<CargarDatosPerfil>{
    //httpOptions.headers.set('Authorization', sessionStorage.getItem(environment.TOKEN));
    //console.log("service "+ usuario);
    
    return this.http.post<CargarDatosPerfil>(this.url + 'postCargarDatosPerfil', datosPerfil);
  }

  
  putActualizarDatos(actualizarContrasena: ActualizarContrasena):Observable<any>{
    return this.http.put<any>(this.url + 'putActualizarContrasena', actualizarContrasena);
  }

  postActualizarDatos(actualizarDatosperfil: ActualizarDatosPerfil): Observable<TraerMensajeDatosPerfil>{

    return this.http.post<TraerMensajeDatosPerfil>(this.url + 'postActualizarDatos', actualizarDatosperfil);

  }

  postAgregarHabitacion(agregarH: AgregarHabitacion){
    return this.http.post<string>(this.url + 'postAgregarhabitacion', agregarH);
  }

  postComprarMembresias(comprarMembresias: ComprarMembresias):Observable<any>{
    return this.http.post<any>(this.url + 'postComprarMembresias', comprarMembresias);
  }

  postAgregarImagen(agregarImagen: AgregarImagen){
    return this.http.post<any>(this.url + 'postSubirFoto', agregarImagen);
  }

  
}
