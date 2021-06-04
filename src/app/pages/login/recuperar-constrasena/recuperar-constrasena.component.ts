import { RegistroLoginService } from './../../../_service/registroLogin.service';
import { RecuperarContrasena } from './../../../_model/RecuperarContrasena';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-recuperar-constrasena',
  templateUrl: './recuperar-constrasena.component.html',
  styleUrls: ['./recuperar-constrasena.component.css']
})
export class RecuperarConstrasenaComponent implements OnInit {

  recuperarForm: FormGroup;

  constructor(
      private loginService : RegistroLoginService,
      public dialogRef: MatDialogRef<RecuperarConstrasenaComponent>,
      @Inject(MAT_DIALOG_DATA) public correo : string,
      ) { 
        
        this.recuperarForm = new FormGroup({
          usuario: new FormControl('', [Validators.required, Validators.maxLength(20)]),
          correo: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
        });
      }

  onFromSubmit(){
    let formularioLogin = this.recuperarForm.value;
    this.recuperarContrasena(formularioLogin);
  }

  ngOnInit(): void {
  }

  aceptar(): void {
    this.dialogRef.close({
        opcion: "Aceptar"
    });
  }

  cancelar(): void {
    this.dialogRef.close({
      opcion: "Cancelar"
    });
    
  }

  recuperarContrasena(recuperar: RecuperarContrasena) {
    //console.log(recuperar);
    this.loginService.postRecuperarConstrasena(recuperar).subscribe(data => {
      //console.log(data);

    });   
  }

}
