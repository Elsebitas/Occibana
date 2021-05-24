import { ActualizarDatosPerfil } from './../_model/ActualizarDatosPerfil';
import { ProgressbarService } from './progressbar.service';
import { CargarDatosPerfil } from './../_model/CargarDatosPerfil';
import { DatosPerfil } from '../_model/DatosPerfil';
import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'Bearer '+sessionStorage.getItem(environment.TOKEN) 
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilService {
  
  private url: string = `${environment.HOST}/perfil/`;

  constructor(private http: HttpClient) { }

  postCargarDatosPerfil(datosPerfil: DatosPerfil): Observable<CargarDatosPerfil>{
    //httpOptions.headers.set('Authorization', sessionStorage.getItem(environment.TOKEN));
    //console.log("service "+ usuario);
    
    return this.http.post<CargarDatosPerfil>(this.url + 'postCargarDatosPerfil', datosPerfil, httpOptions);
  }

  postActualizarDatos(actualizarDatosperfil: ActualizarDatosPerfil): Observable<ActualizarDatosPerfil>{

    return this.http.post<ActualizarDatosPerfil>(this.url + 'postActualizarDatos', actualizarDatosperfil, httpOptions);

  }

}
