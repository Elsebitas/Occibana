import { HabitacionesHotel } from './../../../_model/HabitacionesHotel';
import { ListasService } from './../../../_service/listas.service';
import { RegistroLoginService } from './../../../_service/registroLogin.service';
import { Reserva } from './../../../_model/Reserva';
import { CryptoService } from './../../../_service/crypto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelHotelService } from './../../../_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';


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
  public numPersonas: number;
  public precioHa: number;
  public nombreHotel: string;
  public numeroCam: any;
  public numeroBan: any;

  reservaForm: FormGroup;

  fechaInicio: string;
  fechaFin: string;
  mensaje: string;

  constructor(private panelHotelService: PanelHotelService,
    private router: Router,
    private cryptoService: CryptoService,
    private registroLoginService: RegistroLoginService,
    private listasService: ListasService) {
    //this.id = this.router.getCurrentNavigation().extras.state.idhotel;
    this.id = localStorage.getItem("idhotel");
    //this.idhabita = this.router.getCurrentNavigation().extras.state.idhabitacion;
    this.idhabita = localStorage.getItem("idhabitacion");
    this.nombreHotel = localStorage.getItem("nombreHotel");
    /*this.numPersonas = this.router.getCurrentNavigation().extras.state.numPersonas;
    this.precioHa = this.router.getCurrentNavigation().extras.state.precio;
    this.nombreHotel = this.router.getCurrentNavigation().extras.state.nombre;
    this.numeroCam = this.router.getCurrentNavigation().extras.state.numcamas;
    this.numeroBan = this.router.getCurrentNavigation().extras.state.numbanio;*/

    habitacionHotel.idHotel = this.id;

    this.reservaForm = new FormGroup({
      UsuarioSession: new FormControl(),
      IdDelHotelSession: new FormControl(),
      Nombre: new FormControl('', [Validators.required]),
      Apellido: new FormControl('', [Validators.required]),
      IdHabitacion: new FormControl('', [Validators.required]),
      FechaLlegada: new FormControl('', [Validators.required]),
      FechaSalida: new FormControl('', [Validators.required]),
      NumPersonas: new FormControl('', [Validators.required]),
      ModoDePago: new FormControl('', [Validators.required]),
      PrecioNoche: new FormControl('', [Validators.required]),
    });

  }

  ngOnInit(): void {
    let log = this.registroLoginService.estaLogueado();
    if (log == 1) {
      this.logeado = false;
    }
    this.postHabitacionesHotel();
    //this.select();
    this.setData();
  }

  setData() {
    this.reservaForm.controls['IdDelHotelSession'].setValue(this.id);
    this.reservaForm.controls['IdHabitacion'].setValue(this.idhabita);
    this.reservaForm.controls['NumPersonas'].setValue(this.numPersonas);
    this.reservaForm.controls['PrecioNoche'].setValue(this.precioHa);
    this.reservaForm.controls['UsuarioSession'].setValue(this.cryptoService.decryptUsingAES256("user"));
  }

  dataDisponibilidad() {
    console.log(dispo);
    dispo.FechaLlegada = this.fechaInicio;
    dispo.FechaSalida = this.fechaFin;
    dispo.IdDelHotelSession = this.id;
    dispo.HabitacionIdSession = this.idhabita;
    dispo.NumeroDePersonas = this.numPersonas;
    this.postBuscarDisponibilidadHotel(dispo);
  }

  onFromSubmit() {
    //let formularioLogin = this.reservaForm.value;
    //dispo = this.reservaForm.value;
    console.log(this.reservaForm.value);
    let formularioReserva = this.reservaForm.value;
    this.postReservarHospedaje(formularioReserva);
  }

  postBuscarDisponibilidadHotel(disponibilidad) {
    this.panelHotelService.postBuscarDisponibilidadHotel(disponibilidad).subscribe(data => {
      console.log("Disponibilidad hotel");
      console.log(data);
      rep = data;
      this.mensaje = rep.mensaje;
      console.log("data almacenada");
      console.log(rep);
      let log = this.registroLoginService.estaLogueado();
      if (rep.aviso && log == 1) {
        this.boton = false;
      }
    })
  }

  postReservarHospedaje(reserva: Reserva) {
    this.panelHotelService.postReservarHospedaje(reserva).subscribe(data => {
      console.log("Reserva hotel");
      console.log(data);
    })
  }

  postHabitacionesHotel() {
    habitacionHotel.idHotel = this.id;
    this.listasService.postHabitacionesHotel(habitacionHotel).subscribe(data => {
      console.log("Habitaciones hotel");
      this.habitacionesHotel = data;
      console.log(data);
      this.selectHabitacionesHotel();
    });
  }


  selectHabitacionesHotel() {
    this.habitacionesHotel.forEach(element => {
      if (this.idhabita == element.id) {
        this.habitacionesH = element;
        this.numPersonas = element.numpersonas;
        this.precioHa = element.precio;
        this.numeroCam = element.numcamas;
        this.numeroBan = element.numbanio;
      }
    });
  }

  hotel() {
    this.router.navigate(['/hotel'], { state: { idhotel: this.id } });
  }

}
