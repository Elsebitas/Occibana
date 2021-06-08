import { environment } from './../../../environments/environment';
import { InformacionHotel } from './../../_model/InformacionHotel';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { PanelHotelService } from './../../_service/panel-hotel.service';
import { ProgressbarService } from './../../_service/progressbar.service';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { InicioComponent } from './../inicio/inicio.component';
import { ObtenerComentarios } from './../../_model/ObtenerComentarios';
import { ListasService } from './../../_service/listas.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HabitacionesHotel } from 'src/app/_model/HabitacionesHotel';



const info ={
  IdDelHotelSession: 0
};
const habitacion ={
  IdHabitacionSession: 1
};
const habitacionHotel ={
  idHotel:72,
  numPersonas:null
};

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 600,
    responsive: {
      0: {
        items: 1 
      }
    },
    nav: false
  }

  panelOpenState = false;

  hotelesPrincipales: HotelesPrincipales;

  private id: number;
  private idHabitacion: number;

  obtenerComentarios: ObtenerComentarios;
  
  informacionHotel: InformacionHotel;

  public habitacionesHotel :HabitacionesHotel[]; 

  url:string;

  constructor(private listasService: ListasService, 
              private router: Router, 
              private progressbarService: ProgressbarService, 
              private panelHotelService: PanelHotelService,
              public route: ActivatedRoute) {
  
    this.id = this.router.getCurrentNavigation().extras.state.idhotel;
    this.informacionHotel = new InformacionHotel();

   }

  
  
  //Creo el array
  public comentarios:any = []; 
  ngOnInit(): void {    
    this.url = environment.REALHOST;
    info.IdDelHotelSession = this.id;
    this.progressbarService.barraProgreso.next("1");
    this.postObtenerComents();
    this.postObtenerInformacion();
    this.postInformacionDelHabitacion();
    this.postHabitacionesHotel();
    this.progressbarService.barraProgreso.next("2");
  }
  
  postObtenerInformacion(){
    this.panelHotelService.postInformacionDelHotel(info).subscribe(data =>{
      console.log("info hotel");
      console.log(data);
      this.informacionHotel = data;
    })
  }

  postInformacionDelHabitacion(){
    this.panelHotelService.postInformacionDelHabitacion(habitacion).subscribe(data =>{
      console.log("info habitacion");
      console.log(data);
    })
  }

  postHabitacionesHotel(){
    habitacionHotel.idHotel = this.id;
    this.listasService.postHabitacionesHotel(habitacionHotel).subscribe(data =>{
      console.log("Habitaciones hotel");
      this.habitacionesHotel = data;
      console.log(data);
    });
  }

  postObtenerComents(){
    this.hotelesPrincipales = new HotelesPrincipales();
    this.hotelesPrincipales.idhotel = this.id;
    this.listasService.postObtenerComentarios(this.hotelesPrincipales).subscribe(data =>{
      this.comentarios = data; 
      //console.log(data);
    });
  }

  reservar(idhabitacion,numpersonas, precio, nombre, numcamas, numbanio){
    this.router.navigate(['/hotel/reservar'], { state:{ idhotel: this.id, 
                                                        idhabitacion: idhabitacion,
                                                        numPersonas: numpersonas,
                                                        precio: precio,
                                                        nombre: nombre,
                                                        numcamas: numcamas,
                                                        numbanio: numbanio} });
  }

  
  scroll(el: HTMLElement){
    el.scrollIntoView();
  }
}
