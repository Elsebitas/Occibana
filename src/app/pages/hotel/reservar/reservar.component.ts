import { RegistroLoginService } from './../../../_service/registroLogin.service';
import { Reserva } from './../../../_model/Reserva';
import { CryptoService } from './../../../_service/crypto.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PanelHotelService } from './../../../_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';
import { ValidacionesPropias } from 'src/app/_clase/ValidacionesPropias';


let dispo ={
  IdDelHotelSession: 73,
  FechaLlegada: "2020-05-22T22:19:36.8335811Z",
  FechaSalida: "2020-05-29T22:19:36.8335811Z",
  NumeroDePersonas: 5,
  HabitacionIdSession: 1
};

let rep ={
  aviso: false,
  habitacion: null,
  hotel: null,
  mensaje: null,
  regitro: null,
  url: null,
};


@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.component.html',
  styleUrls: ['./reservar.component.css']
})
export class ReservarComponent implements OnInit {

  boton:boolean = true;
  logeado:boolean = true;

  private id: number;
  private idhabita: number;
  public numPersonas: number;
  public precioHa: number;
  public nombreHotel: string; 
  public numeroCam: string; 
  public numeroBan: string; 
  
  reservaForm: FormGroup;

  fechaInicio: string;
  fechaFin: string;
  mensaje:string;

  constructor(private panelHotelService: PanelHotelService, 
              private router: Router,
              private cryptoService: CryptoService,
              private registroLoginService: RegistroLoginService) {
    this.id = this.router.getCurrentNavigation().extras.state.idhotel;
    this.idhabita = this.router.getCurrentNavigation().extras.state.idhabitacion;
    this.numPersonas = this.router.getCurrentNavigation().extras.state.numPersonas;
    this.precioHa = this.router.getCurrentNavigation().extras.state.precio;
    this.nombreHotel = this.router.getCurrentNavigation().extras.state.nombre;
    this.numeroCam = this.router.getCurrentNavigation().extras.state.numcamas;
    this.numeroBan = this.router.getCurrentNavigation().extras.state.numbanio;

    
    this.reservaForm = new FormGroup({
      UsuarioSession: new FormControl(),
      IdDelHotelSession: new FormControl(),
      Nombre: new FormControl(),
      Apellido: new FormControl(),
      IdHabitacion: new FormControl(),
      FechaLlegada: new FormControl(),
      FechaSalida: new FormControl(),
      NumPersonas: new FormControl(),
      ModoDePago: new FormControl(),
      PrecioNoche: new FormControl(),
      Correo: new FormControl('',[Validators.email]),
      ConfCorreo: new FormControl('',[Validators.email]),
      
    },{validators : ValidacionesPropias.verficarCorreos});

   }

  ngOnInit(): void {    
    let log = this.registroLoginService.estaLogueado();
    if (log == 1) {
      this.logeado = false;
    }
    this.setData();
  }

  setData(){
    this.reservaForm.controls['IdDelHotelSession'].setValue(this.id);
    this.reservaForm.controls['IdHabitacion'].setValue(this.idhabita);
    this.reservaForm.controls['NumPersonas'].setValue(this.numPersonas);
    this.reservaForm.controls['PrecioNoche'].setValue(this.precioHa);
    this.reservaForm.controls['UsuarioSession'].setValue(this.cryptoService.decryptUsingAES256("user"));    
  }

  dataDisponibilidad(){    
    console.log(dispo);
    dispo.FechaLlegada = this.fechaInicio;
    dispo.FechaSalida = this.fechaFin;
    dispo.IdDelHotelSession = this.id;
    dispo.HabitacionIdSession = this.idhabita;
    dispo.NumeroDePersonas = this.numPersonas;
    this.postBuscarDisponibilidadHotel(dispo);
  }

  onFromSubmit(){
    //let formularioLogin = this.reservaForm.value;
    //dispo = this.reservaForm.value;
    //console.log(this.reservaForm.value);
    let formularioReserva = this.reservaForm.value;
    this.postReservarHospedaje(formularioReserva);
  }  

  postBuscarDisponibilidadHotel(disponibilidad){
    this.panelHotelService.postBuscarDisponibilidadHotel(disponibilidad).subscribe(data =>{
      console.log("Disponibilidad hotel");
      console.log(data);
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

  postReservarHospedaje(reserva: Reserva){    
    this.panelHotelService.postReservarHospedaje(reserva).subscribe(data =>{
      //console.log("Reserva hotel");
      //console.log(data);
    })
  }

  hotel(){    
    this.router.navigate(['/hotel'], { state: { idhotel: this.id } });
  }

}
