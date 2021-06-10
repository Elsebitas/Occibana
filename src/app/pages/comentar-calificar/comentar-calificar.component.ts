import { MisReservasComponent } from './../mis-reservas/mis-reservas.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TraerMensajeDatosPerfil } from './../../_model/TraerMensajeDatosPerfil';
import { ComentarCalificarService } from './../../_service/comentar-calificar.service';
import { Router } from '@angular/router';
import { ObtenerComentarios } from './../../_model/ObtenerComentarios';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { ProgressbarService } from './../../_service/progressbar.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Comentar } from 'src/app/_model/Comentar';
import { Calificar } from './../../_model/Calificar';
import { RegistroLoginService } from 'src/app/_service/registroLogin.service';

@Component({
  selector: 'app-comentar-calificar',
  templateUrl: './comentar-calificar.component.html',
  styleUrls: ['./comentar-calificar.component.css']
})
export class ComentarCalificarComponent implements OnInit {

  boton: boolean = true;

  mensaje: string;

  rating: any;

  idHotel: any;

  idReserva: any;

  idUsuario: any;

  nombreHotel: string;

  hotelesPrincipales: HotelesPrincipales;

  reservas: MisReservasComponent;

  comentar: Comentar;

  calificar: Calificar;

  traerMensajeDatosPerfil: TraerMensajeDatosPerfil;

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  commentForm: FormGroup;

  constructor(private login: RegistroLoginService,
              private comentarCalificarService: ComentarCalificarService,
              private progressbarService: ProgressbarService,
              private snackBar: MatSnackBar,
              private router: Router) { 
                this.commentForm = new FormGroup({
                  comentario: new FormControl('', [Validators.required, Validators.maxLength(150), Validators.minLength(5)]),
                });

                this.idHotel = localStorage.getItem('idhotel');
                this.nombreHotel = localStorage.getItem('nombre');
                this.idUsuario = localStorage.getItem('idreserva');
                this.idReserva = localStorage.getItem('idusuario');

                /*
                this.idHotel = this.router.getCurrentNavigation().extras.state.idhotel;
                this.idReserva = this.router.getCurrentNavigation().extras.state.idreserva;
                this.idUsuario = this.router.getCurrentNavigation().extras.state.idusuario;
                this.nombreHotel = this.router.getCurrentNavigation().extras.state.nombre;
                */

              }

  ngOnInit(): void {

    if (this.login.estaLogueado() == 1) {
      this.boton = false;
    }

  }

  comentarHotel() {
    this.progressbarService.barraProgreso.next("1");
    this.comentar = new Comentar();
    this.comentar.Comentario = this.mensaje;
    this.comentar.IdHotelSession = this.idHotel;
    this.comentar.IdSession = this.idUsuario;
    this.comentarCalificarService.postComentar(this.comentar).subscribe(data => {
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;

      if (this.traerMensajeDatosPerfil.mensaje == "Comentario Agregado.") {
        this.cargarsnackBar();
        this.returnPerfil();
      } else {
        this.cargarsnackBar();
      }
      
    })
  }

  calificarHotel() {
    this.progressbarService.barraProgreso.next("1");
    this.calificar = new Calificar();
    this.calificar.Calificacion = this.rating;
    this.calificar.IdHotelSession = this.idHotel;
    this.calificar.IdSession = this.idUsuario;
    this.calificar.IdReserva = this.idReserva;
    if (this.calificar.Calificacion != null) {
      this.comentarCalificarService.postCalificar(this.calificar).subscribe(data => {
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;

      if (this.traerMensajeDatosPerfil.mensaje == "Calificacion realizada con exito") {
        this.cargarsnackBar();
        this.returnPerfil();
      } else {
        this.cargarsnackBar();
      }

      })
    } else {
      this.abrirSnackBar('Primero debe seleccionar una calificación para el hotel','Aceptar');
      this.progressbarService.barraProgreso.next("2");
    }
    
  }

  onRate($event: { oldValue: number, newValue: number }) {
    this.rating = $event.newValue;
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  cargarsnackBar() {
    this.abrirSnackBar(this.traerMensajeDatosPerfil.mensaje,'Aceptar');
    this.progressbarService.barraProgreso.next("2");
  }

  returnPerfil() {
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/perfil']);
    });
  }

}
