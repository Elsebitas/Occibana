import { Login } from './../_model/Login';
import { environment } from './../../environments/environment';
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
export class LoginService {

  private url: string = `${environment.HOST}/registroLogin/`;
  

  constructor( private http: HttpClient) { }

  postIngresoLogin(login: Login): Observable<Login> {
    //const Headers = { 'content-type': 'application/json'}
    //const Body = JSON.stringify(login);
    //console.log(Body);
    /*Body,{'headers': Headers}*/
    return this.http.post<Login>(this.url + 'postIngresoLogin', login, httpOptions);
  }

}
