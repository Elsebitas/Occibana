import { MatTableDataSource } from '@angular/material/table';
import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { ProgressbarService } from './../../_service/progressbar.service';
import { ComentarCalificarService } from './../../_service/comentar-calificar.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comentar-calificar',
  templateUrl: './comentar-calificar.component.html',
  styleUrls: ['./comentar-calificar.component.css']
})
export class ComentarCalificarComponent implements OnInit {

  hotelesPrincipales: HotelesPrincipales;

  displayedColumns: string[] = ['id_usuario', 'nombre_usuario', 'comentario'];

  dataSource = new MatTableDataSource<any>();

  constructor(private comentaCalificarService: ComentarCalificarService,
              private progressbarService: ProgressbarService) { }

  ngOnInit(): void {
    //this.progressbarService.barraProgreso.next("1");
    this.hotelesPrincipales = new HotelesPrincipales();
    this.dataSource = new MatTableDataSource();
  }

  /*
  comentarHotel() {
    this.comentaCalificarService.postComentar().subscribe(data => {

    })
  }

  calificarHotel() {
    this.comentaCalificarService.postCalificar().subscribe(data => {
      
    })
  }
  */

}
