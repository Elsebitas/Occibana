import { ProgressbarService } from './progressbar.service';
import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { tap, catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ServerErrorInterceptorService implements HttpInterceptor {

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private snackBar: MatSnackBar,
              private router: Router,
              private progressbarService: ProgressbarService,
              private _snackBar: MatSnackBar) { }

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
        //console.log("Entro por interceptor: ");
        //console.log('-----El error es: ');
        //console.log(err);
        this.progressbarService.barraProgreso.next("2");

        if (err.status == 400 && err.error.message === "Usuario o contraseña incorrecto") {
          this.abrirSnackBar('Usuario o contraseña incorrectos','Aceptar');
        }
        else if (err.status == 404) {
          this.router.navigate(['/error404/Recurso no encontrado']);
        }
        
        return EMPTY;
      }));
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }
}

