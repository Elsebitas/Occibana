import { Login } from '../_model/Login';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RegistroLoginService {

  private url: string = `${environment.HOST}/registroLogin/`;
  private url2: string = `${environment.HOST}/perfil/`;

  constructor( private http: HttpClient) { }

  postIngresoLogin(login: Login): Observable<any> {
    //const Headers = { 'content-type': 'application/json'}
    //const Body = JSON.stringify(login);
    //console.log(Body);
    /*Body,{'headers': Headers}*/
    return this.http.post<any>(this.url + 'postIngresoLogin', login, httpOptions);
  }

  postCerrarSesion(usuario: string) {
    return this.http.post(this.url2 + 'postCerrarSesion', usuario);
  }

}
