import { AgregarHotel } from './../_model/AgregarHotel';
import { Reserva } from './../_model/Reserva';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { InformacionHotel } from '../_model/InformacionHotel';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})

export class PanelHotelService {

  private url: string = `${environment.HOST}/panelHotel/`;

  constructor(private http: HttpClient) { }

  postInformacionDelHotel(datos): Observable<InformacionHotel>{    
    return this.http.post<InformacionHotel>(this.url + 'postInformacionDelHotel', datos, httpOptions);
  }

  postInformacionDelHabitacion(datos): Observable<any>{    
    return this.http.post<any>(this.url + 'postInformacionDelHabitacion', datos, httpOptions);
  }

  postBuscarDisponibilidadHotel(datos): Observable<any>{    
    return this.http.post<any>(this.url + 'postBuscarDisponibilidadHotel', datos);
  }

  postReservarHospedaje(reserva:Reserva): Observable<any>{    
    return this.http.post<any>(this.url + 'postReservarHospedaje', reserva);
  }

  postAgregarHotel(agregarHotel:AgregarHotel): Observable<any>{   
    return this.http.post<any>(this.url + 'postAgregarHotel', agregarHotel); 
  }
}
