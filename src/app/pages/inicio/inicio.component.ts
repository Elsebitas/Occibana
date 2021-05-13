import { HotelComponent } from './../hotel/hotel.component';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { HotelesDestacados } from './../../_model/HotelesDestacados';
import { ListasService } from './../../_service/listas.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
/**
 * Clase del componente Inicio que implementa OnInit.
 */
export class InicioComponent implements OnInit {

  /**
   * Variable que instancia el objeto FormGroup.
   */
  options: FormGroup;

  /**
   * Variable que oculta el PlaceHolder.
   */
  hideRequiredControl = new FormControl(false);

  /**
   * Variable que permite autocompletar el Form.
   */
  floatLabelControl = new FormControl('auto');
 
  /**
   * Variable que instancia el objeto de la clase HotelesPrincipales.
   */
  hotelesPrincipales : HotelesPrincipales;

  /**
   * Variable de tipo array que almacena los datos provenientes del servicio postHotelesPrincipales.
   */
  public listaDeHotelesPrincipales:any = []; 

  /**
   * Variable para el filtrado.
   */
  searchText:string;

  /**
   * Constructor que inicializa el Forms y el servicio ListasService.
   * 
   * @param listasService recibe el objeto ListasService.
   * @param fb recibe el objeto FormBuilder.
   */
  constructor(private listasService: ListasService, fb: FormBuilder, private router: Router) { 
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      
    });
  }


  /**
   * Método que inicia el servicio postHolelesPrincipales con su suscripción.
   */
  ngOnInit(): void {
    this.listasService.postHolelesPrincipales(this.hotelesPrincipales).subscribe(data =>{
      this.listaDeHotelesPrincipales = data; 
      console.log(data);
    });
  }
 
  mostrarHotel(card){
    this.hotelesPrincipales = new HotelesPrincipales();                                                                            
    this.hotelesPrincipales.idhotel = card;
    this.router.navigate(['/hotel'], { state:{ idhotel: card} });

  }
}
