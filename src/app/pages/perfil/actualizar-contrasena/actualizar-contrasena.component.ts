import { CargarDatosPerfil } from './../../../_model/CargarDatosPerfil';
import { DatosPerfil } from 'src/app/_model/DatosPerfil';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
import { PerfilService } from './../../../_service/perfil.service';
import { ProgressbarService } from './../../../_service/progressbar.service';
import { Router } from '@angular/router';
import { ActualizarContrasena } from './../../../_model/ActualizarContrasena';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ValidacionesPropias } from 'src/app/_clase/ValidacionesPropias';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-contrasena',
  templateUrl: './actualizar-contrasena.component.html',
  styleUrls: ['./actualizar-contrasena.component.css']
})

export class ActualizarContrasenaComponent implements OnInit {

  url: string;

  hide = true;

  hide2 = true;

  hide3 = true;

  error: string;
  
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  cargarDatosPerfil: CargarDatosPerfil;

  profileForm: FormGroup;

  /**
   * Constructor que inicializa el formulario, el ServicioLogin y la ruta.
   * 
   * @param formBuilder recibe el objeto FormBuilder.
   * @param loginService recibe el objeto RegistroLoginService.
   * @param router recibe el objeto Router.
   */
  constructor(private constrasenaService: PerfilService,
              private perfilService: PerfilService,
              private router: Router,
              private progressbarService: ProgressbarService,
              private _snackBar: MatSnackBar) { 
              this.cargarDatosPerfil = new CargarDatosPerfil(),
    
              this.profileForm = new FormGroup({
                  usuario: new FormControl('',Validators.required),
                  Correo: new FormControl('',Validators.required),
                  contrasenaAct: new FormControl('',Validators.required),
                  contrasenaNueva: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#/=])[A-Za-z\d$@$!%*?&].{8,}')]),
                  confContrasenaNueva: new FormControl('', [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&#/=])[A-Za-z\d$@$!%*?&].{8,}')])

                },{validators : ValidacionesPropias.cambiarContrasena});
              }

  cargarDatos(){
    this.profileForm.controls['usuario'].setValue(this.cargarDatosPerfil.datos.usuario);
    this.profileForm.controls['Correo'].setValue(this.cargarDatosPerfil.datos.correo);
  }

  /**
   * Método que instancia el formulario con sus validaciones.
   */
  ngOnInit(): void {
    this.postCargarDatosPerfil();
  }

  postCargarDatosPerfil(){
    this.url = environment.HOST;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    //console.log(decodedToken.name);
    let datosPerfil: DatosPerfil;
    datosPerfil = new DatosPerfil();
    datosPerfil.usuario = decodedToken.name;
    this.perfilService.postCargarDatosPerfil(datosPerfil).subscribe(data =>{ 
      this.cargarDatosPerfil = data; 
      //console.log(data);
      this.cargarDatos();
    })
  }

  /**
   * Método que recibe un formulario y ejecuta el método postIngresoLogin.
   * 
   * @param f recibe el NgForm.
   */
  onFromSubmit() {
    let actualizarContrasena = this.profileForm.value;
    this.actualizarContrasena(actualizarContrasena);
  }

  /**
   * Método que consume el servicio de postIngresoLogin, almacena el token y muestra el error.
   * 
   * @param login recibe el objeto de la clase Login.
   */
   actualizarContrasena(actualizarContrasena: ActualizarContrasena) {
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    //console.log(actualizarContrasena);
    this.constrasenaService.putActualizarDatos(actualizarContrasena).subscribe(data => {
      actualizarContrasena = data;
      this.abrirSnackBar(actualizarContrasena.mensaje, 'Aceptar');
      //console.log(data);
      //console.log(data);
      this.progressbarService.barraProgreso.next("2");
      if(actualizarContrasena.mensaje != "Verifica tus datos.\n La contraseña no coinside con tu usuario"){
        this.router.navigate(['/perfil']);
      }
    })   
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this._snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

}
