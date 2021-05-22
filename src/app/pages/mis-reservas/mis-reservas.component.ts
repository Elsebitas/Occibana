import { DialogoElimReservaComponent } from './dialogo-elim-reserva/dialogo-elim-reserva.component';
import { ProgressbarService } from './../../_service/progressbar.service';
import { MatTableDataSource } from '@angular/material/table';
import { MisReservas } from './../../_model/MisReservas';
import { ListasService } from './../../_service/listas.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  misReservas: MisReservas;

  public listaMisReservas:any = [];

  displayedColumns: string[] = ['num_personas', 'fecha_llegada', 'fecha_salida', 'nombre', 'apellido', 
  'correo', 'medio_pago', 'nombre_hotel', 'calificacion', 'calificar', 'comentar', 'cancelar_reserva'];

  dataSource = new MatTableDataSource<MisReservas>();

  constructor(private listaService: ListasService, private progressbarService:ProgressbarService, public dialogo: MatDialog) { }

  ngOnInit(): void {
    this.progressbarService.barraProgreso.next("1");
      this.misReservas = new MisReservas();
      this.misReservas.id = 39;
      this.listaService.postMostrarMisreservas(this.misReservas).subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.listaMisReservas = data;
      console.log(data);
      this.progressbarService.barraProgreso.next("2");
    });
  }

  dialogoCancelarReserva(idReserva: number) {
      const dialogRef = this.dialogo.open(DialogoElimReservaComponent, {
        width: '250px',
        data: {idReserva: idReserva}
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.opcion == "Aceptar") {
            console.log("se llama el servicio de para eliminar reserva");
        }
      });
  }

}
