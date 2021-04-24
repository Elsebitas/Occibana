import { ListasService } from './../../_service/listas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  constructor(private listasService: ListasService) { }

  ngOnInit(): void {
    this.listasService.getListasZonas().subscribe(data =>{
      console.log(data);
    })
  }

}
