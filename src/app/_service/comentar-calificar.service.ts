import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ComentarCalificarService {

  private url: string = `${environment.HOST}/listas/`;
  
  constructor(private http: HttpClient) { }

  /*
  postComentar(): Observable<any> {
    return this.http.post<any>(this.url + )'postComentar');
  }

  postCalificar(): Observable<any> {
    return this.http.post<any>(this.url + )'postCalificar');
  }
  */
}
