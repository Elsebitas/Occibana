import { ProgressbarService } from './../../_service/progressbar.service';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { InicioComponent } from './../inicio/inicio.component';
import { ObtenerComentarios } from './../../_model/ObtenerComentarios';
import { ListasService } from './../../_service/listas.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  hotelesPrincipales: HotelesPrincipales;

  private id: number;

  obtenerComentarios: ObtenerComentarios;

  constructor(private listasService: ListasService, private router: Router, private progressbarService: ProgressbarService) {
  
    this.id = this.router.getCurrentNavigation().extras.state.idhotel;

   }
  
  //Creo el array
  public comentarios:any = []; 
  ngOnInit(): void {
    this.progressbarService.barraProgreso.next("1");
    this.postObtenerComents();
    this.progressbarService.barraProgreso.next("2");
  }
  
  postObtenerComents(){
    this.hotelesPrincipales = new HotelesPrincipales();
    this.hotelesPrincipales.idhotel = this.id;
    this.listasService.postObtenerComentarios(this.hotelesPrincipales).subscribe(data =>{
      this.comentarios = data; 
      console.log(data);
    });
  }
  
}
