import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TraerMensajeDatosPerfil } from './../../_model/TraerMensajeDatosPerfil';
import { ComentarCalificarService } from './../../_service/comentar-calificar.service';
import { Router } from '@angular/router';
import { ObtenerComentarios } from './../../_model/ObtenerComentarios';
import { MatTableDataSource } from '@angular/material/table';
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

  idReserva: number;

  idHotel: number;

  idUsuario: number;

  nombreHotel: string;

  hotelesPrincipales: HotelesPrincipales;

  comentar: Comentar;

  calificar: Calificar;

  traerMensajeDatosPerfil: TraerMensajeDatosPerfil;

  displayedColumns: string[] = ['id_usuario', 'nombre_usuario', 'comentario'];

  dataSource = new MatTableDataSource<ObtenerComentarios>();

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

                this.idHotel = this.router.getCurrentNavigation().extras.state.idhotel;
                this.idReserva = this.router.getCurrentNavigation().extras.state.idreserva;
                this.idUsuario = this.router.getCurrentNavigation().extras.state.idusuario;
                this.nombreHotel = this.router.getCurrentNavigation().extras.state.nombre;
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
      //console.log(data);
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;
      /*if (this.traerMensajeDatosPerfil.mensaje != "No puede comentar, inicie sesion o verifique si ha pasado mucho tiempo desde esta reserva") {

      }*/
      this.abrirSnackBar(this.traerMensajeDatosPerfil.mensaje,'Aceptar');
      this.progressbarService.barraProgreso.next("2");
    })
  }

  calificarHotel() {
    this.progressbarService.barraProgreso.next("1");
    this.calificar = new Calificar();
    this.calificar.Calificacion = this.rating;
    this.calificar.IdHotelSession = this.idHotel;
    this.calificar.IdSession = this.idUsuario;
    this.calificar.IdReserva = this.idReserva;
    this.comentarCalificarService.postCalificar(this.calificar).subscribe(data => {
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;

      this.abrirSnackBar(this.traerMensajeDatosPerfil.mensaje,'Aceptar');
      this.progressbarService.barraProgreso.next("2");
    })
  }

  onRate($event: { oldValue: number, newValue: number }) {
    //console.log(`Old Value:${$event.oldValue}, New Value: ${$event.newValue}`);
    this.rating = $event.newValue;
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

}
