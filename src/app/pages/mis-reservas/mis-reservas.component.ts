import { Router } from '@angular/router';
import { DialogoElimReservaComponent } from './dialogo-elim-reserva/dialogo-elim-reserva.component';
import { ProgressbarService } from './../../_service/progressbar.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MisReservas } from './../../_model/MisReservas';
import { ListasService } from './../../_service/listas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatSnackBar, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

const id ={
  idReserva: 0
};

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  misReservas: MisReservas;

  public listaMisReservas:any = [];

  displayedColumns: string[] = ['num_personas', 'fecha_llegada', 'fecha_salida', 'nombre', 'apellido', 
  'correo', 'medio_pago', 'nombre_hotel', 'calificacion', 'calificar_comentar', 'cancelar_reserva'];

  dataSource = new MatTableDataSource<MisReservas>();

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private listaService: ListasService, 
              private progressbarService:ProgressbarService, 
              public dialogo: MatDialog,
              private snackBar: MatSnackBar,
              public router: Router) { }

  ngOnInit(): void {
    this.mostrarMisReservas();
  }

  mostrarMisReservas() {
      this.progressbarService.barraProgreso.next("1");
      this.misReservas = new MisReservas();
      this.misReservas.id = 39;
      this.listaService.postMostrarMisreservas(this.misReservas).subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.listaMisReservas = data;
          console.log(data);
          this.progressbarService.barraProgreso.next("2");
      });
  }

  aplicarFiltro(filtro: string) {
    this.dataSource.filter = filtro.trim().toLowerCase();
  }

  dialogoCancelarReserva(idReserva: number) {
      const dialogRef = this.dialogo.open(DialogoElimReservaComponent, {
        width: '250px',
        data: {idReserva: idReserva}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.opcion == "Aceptar") {
            //console.log("se llama el servicio de para eliminar reserva");
            id.idReserva = idReserva;
            this.cancelarReserva(id);
            this.abrirSnackBar('Reserva cancelada con éxito', 'Aceptar');
        }
      });
  }

  cancelarReserva(id) {
    this.listaService.postCancelarMireserva(id).subscribe(data => {
        this.mostrarMisReservas();
        console.log(data);
    })
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition
    });
  }

}
