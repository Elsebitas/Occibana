import { Calificar } from './../_model/Calificar';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { Comentar } from '../_model/Comentar';

@Injectable({
  providedIn: 'root'
})
export class ComentarCalificarService {

  private url: string = `${environment.HOST}/comentarCalificar/`;
  
  constructor(private http: HttpClient) { }

  postComentar(comentar: Comentar): Observable<any> {
    return this.http.post<any>(this.url + 'postComentar', comentar);
  }

  postCalificar(calificar: Calificar): Observable<any> {
    return this.http.post<any>(this.url + 'postCalificar', calificar);
  }

}
