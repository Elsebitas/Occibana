import { environment } from './../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: `${environment.TOKEN}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  
  private url: string = `${environment.HOST}/perfil/`;

  constructor(private http: HttpClient) { }

  postCargarDatosPerfil(usuario: string): Observable<any>{
    return this.http.post<any>(this.url + 'postCargarDatosPerfil', usuario, httpOptions);
  }
}
