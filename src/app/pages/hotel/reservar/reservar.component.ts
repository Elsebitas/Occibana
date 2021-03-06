import { ProgressbarService } from './../../../_service/progressbar.service';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { HabitacionesHotel } from './../../../_model/HabitacionesHotel';
import { ListasService } from './../../../_service/listas.service';
import { RegistroLoginService } from './../../../_service/registroLogin.service';
import { Reserva } from './../../../_model/Reserva';
import { CryptoService } from './../../../_service/crypto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelHotelService } from './../../../_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';
import { ValidacionesPropias } from 'src/app/_clase/ValidacionesPropias';
import { formatDate } from '@angular/common';

let dispo = {
  IdDelHotelSession: 73,
  FechaLlegada: "2020-05-22T22:19:36.8335811Z",
  FechaSalida: "2020-05-29T22:19:36.8335811Z",
  NumeroDePersonas: 5,
  HabitacionIdSession: 1
};

let rep = {
  aviso: false,
  habitacion: null,
  hotel: null,
  mensaje: null,
  regitro: null,
  url: null,
};

const habitacionHotel = {
  idHotel: 72,
  numPersonas: null
};

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})

export class ReservarComponent implements OnInit {

  boton: boolean = true;

  logeado: boolean = true;

  public habitacionesHotel: HabitacionesHotel[];

  public habitacionesH: HabitacionesHotel;

  private id: any;

  private idhabita: any;

  public nombreHotel: string;

  reservaForm: FormGroup;

  fechaInicio: string;

  fechaFin: string;

  mensaje: string;

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private panelHotelService: PanelHotelService,
              private router: Router,
              private cryptoService: CryptoService,
              private registroLoginService: RegistroLoginService,
              private snackBar: MatSnackBar,
              private progressbarService: ProgressbarService,
              private listasService: ListasService) {
                this.id = +localStorage.getItem("idhotel");
                this.idhabita = +localStorage.getItem("idhabitacion");
                this.nombreHotel = localStorage.getItem("nombreHotel");

                habitacionHotel.idHotel = this.id;

                this.reservaForm = new FormGroup({
                  UsuarioSession: new FormControl(),
                  IdDelHotelSession: new FormControl(),
                  Nombre: new FormControl('',[Validators.required]),
                  Apellido: new FormControl('',[Validators.required]),
                  IdHabitacion: new FormControl('',[Validators.required]),
                  FechaLlegada: new FormControl('',[Validators.required]),
                  Fechasalida: new FormControl('',[Validators.required]),
                  NumPersonas: new FormControl('',[Validators.required]),
                  ModoDePago: new FormControl('',[Validators.required]),
                  PrecioNoche: new FormControl('',[Validators.required]),
                  Correo: new FormControl('',[Validators.email]),
                  ConfCorreo: new FormControl('',[Validators.email]),
        
                },{validators : ValidacionesPropias.verficarCorreos});
              }

  ngOnInit(): void {
    let log = this.registroLoginService.estaLogueado();
    if (log == 1) {
      this.logeado = false;
    }
    this.postHabitacionesHotel();
  }

  setData() {
    this.reservaForm.controls['IdDelHotelSession'].setValue(this.id);
    this.reservaForm.controls['IdHabitacion'].setValue(this.idhabita);
    this.reservaForm.controls['NumPersonas'].setValue(this.habitacionesH.numpersonas);
    this.reservaForm.controls['PrecioNoche'].setValue(this.habitacionesH.precio);
    this.reservaForm.controls['UsuarioSession'].setValue(this.cryptoService.decryptUsingAES256("user"));
  }

  dataDisponibilidad() {
    //console.log(dispo);
    dispo.FechaLlegada = this.fechaInicio;
    dispo.FechaSalida = this.fechaFin;
    dispo.IdDelHotelSession = this.id;
    dispo.HabitacionIdSession = this.idhabita;
    dispo.NumeroDePersonas = this.habitacionesH.numpersonas;
    this.postBuscarDisponibilidadHotel(dispo);
  }

  onFromSubmit() {
    //console.log(this.reservaForm.value);
    this.fechaInicio = formatDate(this.fechaInicio,'yyyy-MM-dd','en-Us');
    this.fechaFin = formatDate(this.fechaFin,'yyyy-MM-dd','en-Us');
    //console.log(this.fechaInicio);
    //console.log(this.fechaFin);
    this.reservaForm.controls['FechaLlegada'].setValue(this.fechaInicio);
    this.reservaForm.controls['Fechasalida'].setValue(this.fechaFin);
    let formularioReserva = this.reservaForm.value;
    this.postReservarHospedaje(formularioReserva);
  }

  postBuscarDisponibilidadHotel(disponibilidad) {
    this.panelHotelService.postBuscarDisponibilidadHotel(disponibilidad).subscribe(data => {
      //console.log("Disponibilidad hotel");
      //console.log(data);
      rep = data;
      this.mensaje = rep.mensaje;
      //console.log("data almacenada");
      //console.log(rep);
      let log = this.registroLoginService.estaLogueado();
      if (rep.aviso && log == 1) {
        this.boton = false;
      }
    })
  }

  postReservarHospedaje(reserva: Reserva) {
    this.progressbarService.barraProgreso.next("1");
    //console.log("Reserva Objeto");
    //console.log(reserva);
    this.panelHotelService.postReservarHospedaje(reserva).subscribe(data => {
      //console.log("Reserva hotel");
      //console.log(data);
      reserva = data;
      if (!reserva.boton) {    
        this.abrirSnackBar('Reserva realizada con ??xito','Aceptar');
        this.router.navigate(['/perfil']);
      }else {
        this.abrirSnackBar('No se realiz?? la reserva, intente nuevamente','Aceptar');
      }      
      this.progressbarService.barraProgreso.next("2");
    })
  }

  postHabitacionesHotel() {
    habitacionHotel.idHotel = this.id;
    this.listasService.postHabitacionesHotel(habitacionHotel).subscribe(data => {
      //console.log("Habitaciones hotel");
      this.habitacionesHotel = data;
      //console.log(data);
      this.selectHabitacionesHotel();      
      this.setData();
    });
  }

  selectHabitacionesHotel() {
    this.habitacionesHotel.forEach(element => {
      if (this.idhabita == element.id) {
        this.habitacionesH = element;
      }
    });
  }

  hotel() {
    this.router.navigate(['/hotel']);
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

}
