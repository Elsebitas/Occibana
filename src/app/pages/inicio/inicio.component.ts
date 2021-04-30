import { HotelesPrincipales } from './../../_model/HotelesPrincipales';
import { HotelesDestacados } from './../../_model/HotelesDestacados';
import { ListasService } from './../../_service/listas.service';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {


  options: FormGroup;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');
 
  hotelesPrincipales : HotelesPrincipales;
  public listaDeHotelesPrincipales:any = []; 

  searchText:string;


  constructor(private listasService: ListasService, fb: FormBuilder) { 
    this.options = fb.group({
      hideRequired: this.hideRequiredControl,
      floatLabel: this.floatLabelControl,
    });
  }

  ngOnInit(): void {
    this.listasService.postHolelesPrincipales(this.hotelesPrincipales).subscribe(data =>{
      this.listaDeHotelesPrincipales = data; 
      console.log(data);
    });
  }
}
