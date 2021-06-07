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
  banios;
  agregarhform: FormGroup;
  error: string;
  id: number;
  nombre: string;
  
  constructor(private agregarHabitacionService: PerfilService,
              private snackBar: MatSnackBar,
              private router: Router,
              private progressbarService: ProgressbarService,) { 
                this.id = this.router.getCurrentNavigation().extras.state.idhotel;
                this.nombre = this.router.getCurrentNavigation().extras.state.nombreHotel;
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
    if(this.agregarhform.value['tipo'] == "10000"){
      agregarH.tipoHabitacionNumero = 1;
      agregarH.TipoHabitacion = "Básica";
    }if(this.agregarhform.value['tipo'] == "20000"){
      agregarH.tipoHabitacionNumero = 2;
      agregarH.TipoHabitacion = "Doble";
    }if(this.agregarhform.value['tipo'] == "40000"){
      agregarH.tipoHabitacionNumero = 3;
      agregarH.TipoHabitacion = "Premium";
    }
    agregarH.NumeroMaximoDePersonas = this.agregarhform.value['cantpersonas'];
    agregarH.NumeroDeBanos = this.agregarhform.value['numbanios']; 
    agregarH.IdHotel = this.id;
    agregarH.NumeroDeCamas = this.agregarhform.value['cantcamas'];
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    this.agregarHabitacionService.postAgregarHabitacion(agregarH).subscribe(data =>{
      this.openSnackBar('Habitación registrada exitosamente', 'Aceptar');
      this.progressbarService.barraProgreso.next("2");
      this.router.navigate(['/perfil']);
    })
  }

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action);
  }
}
