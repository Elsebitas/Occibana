import { HotelesDestacados } from './../../_model/HotelesDestacados';
import { ListasZonas } from './../../_model/ListasZonas';
import { ListasMunicipios } from './../../_model/ListasMunicipios';

import { ProgressbarService } from './../../_service/progressbar.service';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { ListasService } from './../../_service/listas.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { fadeInItems } from '@angular/material/menu';
import { StarRatingComponent } from 'ng-starrating';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})

/**
 * Clase del componente Inicio que implementa OnInit.
 */
export class InicioComponent implements OnInit {
  url: string = environment.REALHOST;


  /**
   * Variable que instancia el objeto de la clase HotelesPrincipales.
   */
  hotelesPrincipales: HotelesPrincipales;


  /**
   * Variable de tipo array que almacena los datos provenientes del servicio postHotelesPrincipales.
   */
  public listaDeHotelesPrincipales: HotelesPrincipales[];
  public hotelesDestacados: HotelesDestacados[];
  public listasMunicipios: ListasMunicipios[];
  public listasZonas: ListasZonas[];
  listaDeHotelesPrincipalesFiltrados: HotelesPrincipales[];


  /**
   * Variable para el filtrado.
   */
  private _searchTerm: string;
  private _searchText: string;
  private _searchMun: string;
  private _searchMin: number;
  private _searchMax: number;
  private _searchHab: string;
  private _searchZona: string;
  private _searchPer: number;
  private _searchStr: number;


  get searchStr(): number {
    return this._searchStr;
  }

  set searchStr(value: number) {
    this._searchStr = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredStrHotel(value);
  }

  filteredStrHotel(searchString: number) {
    return this.listaDeHotelesPrincipales.filter(lista =>
      lista.promediocalificacion == searchString);

  }

  get searchPer(): number {
    return this._searchPer;
  }

  set searchPer(value: number) {
    this._searchPer = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredPerHotel(value);
  }



  

  filteredPerHotel(searchString: number) {
    return this.listaDeHotelesPrincipales.filter(lista =>
      lista.numpersonas == searchString);

  }

  get searchZona(): string {
    return this._searchZona;
  }

  set searchZona(value: string) {
    this._searchZona = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredZonaHotel(value);
  }

  filteredZonaHotel(searchString: string) {
    return this.listaDeHotelesPrincipales.filter(lista =>
      lista.zona.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchHab(): string {
    return this._searchHab;
  }

  set searchHab(value: string) {
    this._searchHab = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredHabHotel(value);
  }



  filteredHabHotel(searchString: string) {
    return this.listaDeHotelesPrincipales.filter(lista =>
      lista.tipo.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredNameHotel(value);
  }




  filteredNameHotel(searchString: string) {
    return this.listaDeHotelesPrincipales.filter(lista =>
      lista.nombre.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchText(): string {
    return this._searchText;
  }

  set searchText(value: string) {
    this._searchText = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredZoneHotel(value);
  }


  filteredZoneHotel(searchString: string) {
    return this.listaDeHotelesPrincipales.filter(listaa =>
      listaa.zona.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchMun(): string {
    return this._searchMun;
  }

  set searchMun(value: string) {
    this._searchMun = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredMunHotel(value);
  }


  filteredMunHotel(searchString: string) {
    return this.listaDeHotelesPrincipales.filter(listaa =>
      listaa.municipio.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);

  }

  get searchMin(): number {
    return this._searchMin;
  }

  set searchMin(value: number) {
    this._searchMin = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredMinHotel(value);
  }


  filteredMinHotel(searchString: number) {
    return this.listaDeHotelesPrincipales.filter(listaa =>
      listaa.precionoche >= searchString);

  }

  get searchMax(): number {
    return this._searchMax;
  }

  set searchMax(value: number) {
    this._searchMax = value;
    this.listaDeHotelesPrincipalesFiltrados = this.filteredMaxHotel(value);
  }


  filteredMaxHotel(searchString: number) {
    return this.listaDeHotelesPrincipales.filter(listaa =>
      listaa.precioNochePremium <= searchString);

  }

  /**
   * Constructor que inicializa el Forms y el servicio ListasService.
   * 
   * @param listasService recibe el objeto ListasService.
   */
  constructor(private listasService: ListasService, private router: Router, private progressbarService: ProgressbarService) {
  }



  /**
   * Método que inicia el servicio postHolelesPrincipales con su suscripción.
   */
  ngOnInit(): void {
    this.hotelesPrincipales = new HotelesPrincipales;
    this.listasService.postHolelesPrincipales(this.hotelesPrincipales).subscribe(data => {
      this.listaDeHotelesPrincipales = data;
      this.listaDeHotelesPrincipalesFiltrados = data;
      //console.log(data);
    });

    this.listasService.getListasMunicipios().subscribe(data => {
      this.listasMunicipios = data;
    });

    this.listasService.getListasZonas().subscribe(data => {
      this.listasZonas = data;
    });

    this.listasService.getHotelesDestacados().subscribe(data => {
      this.hotelesDestacados = data;
    });
  }


  mostrarHotel(card) {
    this.hotelesPrincipales = new HotelesPrincipales();
    this.hotelesPrincipales.idhotel = card;
    this.router.navigate(['/hotel'], { state: { idhotel: card } });

  }


  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: true,
    dots: true,
    margin: 40,
    navSpeed: 600,
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
  }

  customOptions2: OwlOptions = {
    loop: true,
    autoplay: true,
    mouseDrag: false,
    dots: false,
    animateOut: 'fadeOut',
    responsive: {
      0: {
        items: 1
      },
    },
    nav: false,
  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent }) {
    let numero = $event.newValue;
    this.searchStr = numero;
  }

}


