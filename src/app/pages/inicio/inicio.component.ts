import { HotelesDestacados } from './../../_model/HotelesDestacados';
import { ListasService } from './../../_service/listas.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  public listaDeHotelesDestacados:any = []; 
  dataSource = new MatTableDataSource<HotelesDestacados>();



  constructor(private listasService: ListasService) { }

  ngOnInit(): void {
    this.listasService.getHotelesDestacados().subscribe(data =>{
      this.listaDeHotelesDestacados = data; 
      console.log(data);
    });
  }
  applyFilter(filtro: string) {
    this.listaDeHotelesDestacados.filter = filtro.trim().toLowerCase();
  }
}
