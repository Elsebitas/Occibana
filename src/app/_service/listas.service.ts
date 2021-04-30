import { Observable } from 'rxjs';
import { HotelesPrincipales } from './../_model/HotelesPrincipales';
import { HotelesDestacados } from './../_model/HotelesDestacados';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Listas } from '../_model/Listas';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',  
  })
};

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private url: string = `${environment.HOST}/listas/`;

  constructor(private http: HttpClient) { }

  getListasZonas(){
    return this.http.get<Listas[]>(`${this.url}getListasZonas`);
  }

  getHotelesDestacados(){
    return this.http.get<HotelesDestacados[]>(`${this.url}getHotelesDestacados`);
  }

  postHolelesPrincipales(hotelesPrincipales:HotelesPrincipales): Observable<any>{
    return this.http.post<any>(this.url + 'postHotelesPrincipal', hotelesPrincipales, httpOptions)

  }

}
