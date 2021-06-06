import { Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ProgressbarService } from './../../../_service/progressbar.service';
import { ListasService } from './../../../_service/listas.service';
import { MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MostrarReservasHotel } from './../../../_model/MostrarReservasHotel';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-reservas-hotel',
  templateUrl: './reservas-hotel.component.html',
  styleUrls: ['./reservas-hotel.component.css']
})
export class ReservasHotelComponent implements OnInit {

  mostrarReservasHotel: MostrarReservasHotel;

  displayedColumns1: string[] = ['num_personas', 'fecha_llegada', 'fecha_salida', 'nombre', 'apellido','correo'];

  displayedColumns2: string[] = ['num_personas', 'fecha_llegada', 'fecha_salida', 'nombre', 'apellido', 
  'correo', 'medio_pago'];

  dataSource1 = new MatTableDataSource<MostrarReservasHotel>();

  dataSource2 = new MatTableDataSource<MostrarReservasHotel>();

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  idHotel: number;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private listasService:ListasService, 
              private progressbarService:ProgressbarService,
              private router: Router) {
    this.idHotel = this.router.getCurrentNavigation().extras.state.idhotel;
   }

  ngOnInit(): void {
    this.getMostrarReservas();
    this.getMostrarReservasCompletadas();
  }

  getMostrarReservas(){
    this.progressbarService.barraProgreso.next("1");
    this.mostrarReservasHotel = new MostrarReservasHotel();
    this.listasService.getMostrarReservas(this.idHotel).subscribe(data=>{
      this.dataSource1 = new MatTableDataSource(data);      
      this.dataSource1.sort = this.sort;
      this.dataSource1.paginator = this.paginator;
      this.progressbarService.barraProgreso.next("2");
    })
  }

  getMostrarReservasCompletadas(){
    this.progressbarService.barraProgreso.next("1");
    this.mostrarReservasHotel = new MostrarReservasHotel();
    this.listasService.getMostrarReservasCompletadas(this.idHotel).subscribe(data=>{
      this.dataSource2 = new MatTableDataSource(data);      
      this.dataSource2.sort = this.sort;
      this.dataSource2.paginator = this.paginator;
      this.progressbarService.barraProgreso.next("2");
    })
  }

  aplicarFiltro(filtro: string) {
    this.dataSource1.filter = filtro.trim().toLowerCase();
    this.dataSource2.filter = filtro.trim().toLowerCase();
  }

}
