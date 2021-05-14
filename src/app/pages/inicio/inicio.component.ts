import { ProgressbarService } from './../../_service/progressbar.service';
import { Observable } from 'rxjs';
import { HotelComponent } from './../hotel/hotel.component';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { HotelesDestacados } from './../../_model/HotelesDestacados';
import { ListasService } from './../../_service/listas.service';
import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { OwlOptions } from 'ngx-owl-carousel-o';

export interface State {
  flag: string;
  name: string;
}
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
  stateCtrl = new FormControl();
  filteredStates: Observable<State[]>;

  public images = [
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/cheems.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    },
    {
      src: "./assets/images/hotel1.jpg"
    }
]

dynamicSlides = [
  {
    id: 1,
    src:'./assets/images/hotel1.jpg',
    alt:'Side 1',
    title:'Side 1'
  },
  {
    id: 2,
    src:'https://via.placeholder.com/600/771796',
    alt:'Side 2',
    title:'Side 2'
  },
  {
    id: 3,
    src:'https://via.placeholder.com/600/24f355',
    alt:'Side 3',
    title:'Side 3'
  },
  {
    id: 4,
    src:'https://via.placeholder.com/600/d32776',
    alt:'Side 4',
    title:'Side 4'
  },
  {
    id: 5,
    src:'https://via.placeholder.com/600/f66b97',
    alt:'Side 5',
    title:'Side 5'
  }
]


states: State[] = [
  {
    name: 'Bojaca',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'El Rosal',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'Facatativa',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'Funza',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'Madrid',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'Mosquera',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'Subachoque',
    flag: './assets/images/Ubicacion.svg'
  },
  {
    name: 'Zipacon',
    flag: './assets/images/Ubicacion.svg'
  }
];
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
  public listaDeHotelesPrincipales:HotelesPrincipales[]; 
  listaDeHotelesPrincipalesFiltrados: HotelesPrincipales[];


  /**
   * Variable para el filtrado.
   */
  private _searchTerm : string;
  private _searchText : string;
  private _searchMun : string; 
  private _searchMin : number;
  private _searchMax : number;
  obs: Observable<any>;


  get searchTerm(): string{
    return this._searchTerm;
  }

  set searchTerm(value: string){
    this._searchTerm = value; 
    this.listaDeHotelesPrincipalesFiltrados = this.filteredNameHotel(value); 
  }

 
  filteredNameHotel(searchString : string){
    return this.listaDeHotelesPrincipales.filter(lista => 
      lista.nombre.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchText(): string{
    return this._searchText;
  }

  set searchText(value: string){
    this._searchText = value; 
    this.listaDeHotelesPrincipalesFiltrados = this.filteredZoneHotel(value); 
  }


  filteredZoneHotel(searchString : string){
    return this.listaDeHotelesPrincipales.filter(listaa => 
      listaa.zona.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchMun(): string{
    return this._searchMun;
  }

  set searchMun(value: string){
    this._searchMun = value; 
    this.listaDeHotelesPrincipalesFiltrados = this.filteredMunHotel(value); 
  }


  filteredMunHotel(searchString : string){
    return this.listaDeHotelesPrincipales.filter(listaa => 
      listaa.municipio.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchMin(): number{
    return this._searchMin;
  }

  set searchMin(value: number){
    this._searchMin = value; 
    this.listaDeHotelesPrincipalesFiltrados = this.filteredMinHotel(value); 
  }


  filteredMinHotel(searchString : number){
    return this.listaDeHotelesPrincipales.filter(listaa => 
      listaa.precionoche >= searchString);

  }

  get searchMax(): number{
    return this._searchMax;
  }

  set searchMax(value: number){
    this._searchMax = value; 
    this.listaDeHotelesPrincipalesFiltrados = this.filteredMaxHotel(value); 
  }


  filteredMaxHotel(searchString : number){
    return this.listaDeHotelesPrincipales.filter(listaa => 
      listaa.precioNochePremium <= searchString);

  }



  /**
   * Constructor que inicializa el Forms y el servicio ListasService.
   * 
   * @param listasService recibe el objeto ListasService.
   * @param fb recibe el objeto FormBuilder.
   */
  constructor(private listasService: ListasService, fb: FormBuilder, private router: Router, private progressbarService: ProgressbarService) { 

    this.filteredStates = this.stateCtrl.valueChanges
    .pipe(
      startWith(''),
      map(state => state ? this._filterStates(state) : this.states.slice())
    );
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
      
    });
  }



  /**
   * Método que inicia el servicio postHolelesPrincipales con su suscripción.
   */
  ngOnInit(): void {
    this.progressbarService.barraProgreso.next("1");
    this.hotelesPrincipales = new HotelesPrincipales;
    this.listasService.postHolelesPrincipales(this.hotelesPrincipales).subscribe(data =>{
      this.listaDeHotelesPrincipales = data; 
      this.listaDeHotelesPrincipalesFiltrados = data;
      console.log(data);
      this.progressbarService.barraProgreso.next("2");
    });
  }



  customOptions: OwlOptions = {
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 600,
    navText: ['&#8249', '&#8250;'],
    responsive: {
      0: {
        items: 1 
      },
      400: {
        items: 2
      },
      760: {
        items: 3
      },
      1000: {
        items: 4
      }
    },
    nav: true
  }


  private _filterStates(value: string): State[] {
    const filterValue = value.toLowerCase();

    return this.states.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  
  mostrarHotel(card){
    this.hotelesPrincipales = new HotelesPrincipales();                                                                            
    this.hotelesPrincipales.idhotel = card;
    this.router.navigate(['/hotel'], { state:{ idhotel: card} });

  }
}


