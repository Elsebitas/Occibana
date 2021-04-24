import { Login } from './../_model/Login';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url: string = `${environment.HOST}/registroLogin/`;
  

  constructor( private http: HttpClient) { }

  postIngresoLogin(login: Login): Observable<any> {
    const Headers = { 'content-type': 'application/json'}
    const Body = JSON.stringify(login);
    console.log(Body);
    return this.http.post(this.url + 'postIngresoLogin', Body,{'headers': Headers});
  }

}
