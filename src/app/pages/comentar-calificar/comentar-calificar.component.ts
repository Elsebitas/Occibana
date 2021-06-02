import { TraerMensajeDatosPerfil } from './../../_model/TraerMensajeDatosPerfil';
import { ComentarCalificarService } from './../../_service/comentar-calificar.service';
import { Router } from '@angular/router';
import { ObtenerComentarios } from './../../_model/ObtenerComentarios';
import { ListasService } from './../../_service/listas.service';
import { MatTableDataSource } from '@angular/material/table';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { ProgressbarService } from './../../_service/progressbar.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Comentar } from 'src/app/_model/Comentar';
import { RegistroLoginService } from 'src/app/_service/registroLogin.service';

@Component({
  selector: 'app-comentar-calificar',
  templateUrl: './comentar-calificar.component.html',
  styleUrls: ['./comentar-calificar.component.css']
})
export class ComentarCalificarComponent implements OnInit {

  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') private color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();

  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  private snackBarDuration: number = 2000;
  public ratingArr = [];

  boton: boolean = true;

  mensaje: string;

  idHotel: number;

  idUsuario: number;

  nombreHotel: string;

  hotelesPrincipales: HotelesPrincipales;

  comentar: Comentar;

  traerMensajeDatosPerfil: TraerMensajeDatosPerfil;

  displayedColumns: string[] = ['id_usuario', 'nombre_usuario', 'comentario'];

  dataSource = new MatTableDataSource<ObtenerComentarios>();

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private login: RegistroLoginService,
              private listaService: ListasService,
              private comentarCalificarService: ComentarCalificarService,
              private progressbarService: ProgressbarService,
              private snackBar: MatSnackBar,
              private router: Router) { 
                this.idHotel = this.router.getCurrentNavigation().extras.state.idhotel;
                this.idUsuario = this.router.getCurrentNavigation().extras.state.idusuario;
                this.nombreHotel = this.router.getCurrentNavigation().extras.state.nombre;
              }

  ngOnInit(): void {
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }

    if (this.login.estaLogueado() == 1) {
      this.boton = false;
    }

  }

  onClick(rating: number) {
    this.snackBar.open('Has calificado ' + rating + ' / ' + this.starCount + ' estrellas', 'Aceptar', {
      duration: this.snackBarDuration,
      verticalPosition: this.verticalPosition
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

  comentarHotel() {
    this.progressbarService.barraProgreso.next("1");
    this.comentar = new Comentar();
    this.comentar.Comentario = this.mensaje;
    this.comentar.IdHotelSession = this.idHotel;
    this.comentar.IdSession = this.idUsuario;
    this.comentarCalificarService.postComentar(this.comentar).subscribe(data => {
      console.log(data);
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;
      this.abrirSnackBar(this.traerMensajeDatosPerfil.mensaje,'Aceptar');
      this.progressbarService.barraProgreso.next("2");
    })
  }

  

  /*
  calificarHotel() {
    this.comentarCalificarService.postCalificar().subscribe(data => {
      
    })
  }*/

  abrirSnackBar(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

}

export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
