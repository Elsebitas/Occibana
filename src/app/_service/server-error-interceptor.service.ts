import { ProgressbarService } from './progressbar.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, pipe } from 'rxjs';

import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServerErrorInterceptorService implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar,
    private router: Router,
    private progressbarService: ProgressbarService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(retry(environment.REINTENTOS)).
      pipe(tap(event => {
        if (event instanceof HttpResponse) {
          if (event.body && event.body.error === true && event.body.errorMessage) {
            throw new Error(event.body.errorMessage);
          }/*else{
                       Entra al else si en los intentos el servicio Funciona   
                    }*/
        }
      })).pipe(catchError((err) => {
        console.log("Entro por interceptor: ");
        console.log(err);
        this.progressbarService.barraProgreso.next("2");

        if (err.status == 400 && err.error.message === "Usuario o contraseña incorrecto") {
          this.snackBar.open('Usuario y/o cotraseña inconrrecta', 'Advertrencia', {
            duration: 3000,
          });
        } 
        return EMPTY;
      }));
  }
}

