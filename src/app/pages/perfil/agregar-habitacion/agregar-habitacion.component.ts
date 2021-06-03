import { ProgressbarService } from './../../../_service/progressbar.service';
import { Router } from '@angular/router';
import { PerfilService } from '../../../_service/perfil.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgregarHabitacion } from '../../../_model/AgregarHabitacion';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-agregar-habitacion',
  templateUrl: './agregar-habitacion.component.html',
  styleUrls: ['./agregar-habitacion.component.css']
})
export class AgregarHabitacionComponent implements OnInit {
  selected;
  agregarhform: FormGroup;
  error: string;
  id: number;
  
  constructor(private agregarHabitacionService: PerfilService,
              private snackBar: MatSnackBar,
              private router: Router,
              private progressbarService: ProgressbarService,) { 
                this.id = this.router.getCurrentNavigation().extras.state.idhotel;
              }


  ngOnInit(): void {
    this.agregarhform = new FormGroup({
      'numbanios': new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
      'cantpersonas': new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
      'cantcamas': new FormControl('',[Validators.required,Validators.pattern('^[0-9]+$')]),
      'tipo': new FormControl('',[Validators.required]),
    })
  }


  agregarHabitacion(){
    let agregarH = new AgregarHabitacion();
    if(this.agregarhform.value['tipo'] == "Básica"){
      agregarH.tipoHabitacionNumero = 1;
    }if(this.agregarhform.value['tipo'] == "Doble"){
      agregarH.tipoHabitacionNumero = 2;
    }if(this.agregarhform.value['tipo'] == "Premium"){
      agregarH.tipoHabitacionNumero = 3;
    }
    agregarH.NumeroMaximoDePersonas = this.agregarhform.value['cantpersonas'];
    agregarH.NumeroDeBanos = this.agregarhform.value['numbanios']; 
    agregarH.IdHotel = this.id;
    agregarH.TipoHabitacion = this.agregarhform.value['tipo'];
    agregarH.NumeroDeCamas = this.agregarhform.value['cantcamas'];
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    this.agregarHabitacionService.postAgregarHabitacion(agregarH).subscribe(data =>{
      this.openSnackBar('Habitacion registrada exitosamente', 'Ok');
      this.progressbarService.barraProgreso.next("2");
      this.router.navigate(['/perfil']);
    })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action);
  }
}
