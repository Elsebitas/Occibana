import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Listas } from '../_model/Listas';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  private url: string = `${environment.HOST}/listas/`;

  constructor(private http: HttpClient) { }

  getListasZonas(){
    return this.http.get<Listas[]>(`${this.url}getListasZonas`);
  }

}
