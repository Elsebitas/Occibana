import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { ReactivarCuenta } from './../../../_model/ReactivarCuenta';
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

  reactivarForm: FormGroup;

  recuperarForm: FormGroup;

  public mostrar: boolean = true;

  public mostrar2: boolean = false;
  
  public hide2: boolean;

  public hide3: boolean;

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private loginService: RegistroLoginService,
              public dialogRef: MatDialogRef<RecuperarConstrasenaComponent>,
              private _snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public correo: string,) {
                this.recuperarForm = new FormGroup({
                  usuario: new FormControl('', [Validators.required, Validators.maxLength(20)]),
                  correo: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(50)]),
                });

                this.reactivarForm = new FormGroup({
                  usuario : new FormControl('',),
                  codigo: new FormControl('', [Validators.required]),
                  contrasena: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#/=])[A-Za-z\d$@$!%*?&].{8,}')])
                  //confContrasenaNueva: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#/=])[A-Za-z\d$@$!%*?&].{8,}')])
                });
              }
  
  cargarDatos(){
    this.reactivarForm.controls['usuario'].setValue(this.recuperarForm.get("usuario").value);
    //console.log(this.recuperarForm.get("usuario").value);
  }

  onFromSubmit() {
    let formularioLogin = this.recuperarForm.value;
    this.recuperarContrasena(formularioLogin);
    this.aceptar();   
  }

  onFromSubmit2() {
    this.cargarDatos();
    let formularioReactivar = this.reactivarForm.value;
    this.reactivarCuentaE(formularioReactivar);
    this.hecho();
  }

  ngOnInit(): void {
  }

  aceptar(): void {
    this.mostrar = false;
    this.mostrar2 = true;
  }

  cancelar(): void {
    this.dialogRef.close({
      opcion: "Cancelar"
    });
  }

  hecho(): void {
    this.dialogRef.close({
      opcion: "Hecho"
    });
    this.abrirSnackBar("La contraseña se actualizó correctamente","Aceptar");
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

  recuperarContrasena(recuperar: RecuperarContrasena) {
    //console.log(recuperar);
    this.loginService.postRecuperarConstrasena(recuperar).subscribe(data => {
      //console.log(data);
    });
  }

  reactivarCuentaE(reactivar: ReactivarCuenta) {
    //console.log(reactivar);
    this.loginService.putReactivarCuenta(reactivar).subscribe(data => {
      //console.log(data);
    });
  }

}