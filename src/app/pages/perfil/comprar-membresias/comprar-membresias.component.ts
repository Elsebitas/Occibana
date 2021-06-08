import { ProgressbarService } from './../../../_service/progressbar.service';
import { CryptoService } from './../../../_service/crypto.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ComprarMembresias } from './../../../_model/ComprarMembresias';
import { PerfilService } from 'src/app/_service/perfil.service';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-comprar-membresias',
  templateUrl: './comprar-membresias.component.html',
  styleUrls: ['./comprar-membresias.component.css']
})
export class ComprarMembresiasComponent implements OnInit {

  membresiaForm: FormGroup;

  id:number;
  usuario:string;
  correo:string;


  constructor(private perfilService: PerfilService, 
              private router: Router,
              private cryptoService: CryptoService,
              private progressbarService: ProgressbarService,
              private _snackBar: MatSnackBar) {
    
    this.id = this.router.getCurrentNavigation().extras.state.id;
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    this.correo = this.router.getCurrentNavigation().extras.state.correo;

    this.membresiaForm = new FormGroup({
      Cedula: new FormControl('',[Validators.required]),
      CodigoDeSeguridad: new FormControl('',[Validators.required,Validators.maxLength(3),Validators.minLength(3), Validators.pattern('^[0-9]+$')]),
      DireccionPropietario: new FormControl('',[Validators.required]),
      NombreDelPropietario: new FormControl('',[Validators.required, Validators.pattern('^[a-z A-Z]+$')]),
      NumeroTarjeta: new FormControl('',[Validators.required, Validators.maxLength(16),Validators.minLength(16), Validators.pattern('^[0-9]+$')]),
      Usuario: new FormControl(),
      Contrasena: new FormControl(),
      Id: new FormControl(),
      Correo: new FormControl(),
      UsuarioSession: new FormControl(),
      IdUsuarioSession: new FormControl(),
    });

  }

  ngOnInit(): void {
    this.setData();
  }
  

  setData(){
    this.membresiaForm.controls['Id'].setValue(this.id);
    this.membresiaForm.controls['IdUsuarioSession'].setValue(this.id);
    this.membresiaForm.controls['UsuarioSession'].setValue(this.usuario);
    this.membresiaForm.controls['Correo'].setValue(this.correo); 
    this.membresiaForm.controls['Usuario'].setValue(this.usuario); 
    this.membresiaForm.controls['Contrasena'].setValue(this.cryptoService.decryptUsingAES256("userpassword")); 
  }

  onFromSubmit() {
    //console.log(this.membresiaForm.value);
    let formularioMembresia = this.membresiaForm.value;
    this.postComprarMembresias(formularioMembresia);
  }

  postComprarMembresias(comprarMembresias: ComprarMembresias) {
    this.progressbarService.barraProgreso.next("1");
    this.perfilService.postComprarMembresias(comprarMembresias).subscribe(data => {
      comprarMembresias = data;
      //console.log(data);
      this._snackBar.open(comprarMembresias.error,'ACEPTAR');
      this.progressbarService.barraProgreso.next("2");
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/perfil']);
    });
    })
  }

}
