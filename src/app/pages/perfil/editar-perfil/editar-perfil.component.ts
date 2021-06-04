import { Login } from './../../../_model/Login';
import { RegistroLoginService } from './../../../_service/registroLogin.service';
import { CryptoService } from './../../../_service/crypto.service';
import { ProgressbarService } from './../../../_service/progressbar.service';
import { TraerMensajeDatosPerfil } from './../../../_model/TraerMensajeDatosPerfil';
import { CargarDatosPerfil } from './../../../_model/CargarDatosPerfil';
import { DatosPerfil } from './../../../_model/DatosPerfil';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActualizarDatosPerfil } from './../../../_model/ActualizarDatosPerfil';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PerfilService } from 'src/app/_service/perfil.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidacionesPropias } from 'src/app/_clase/ValidacionesPropias';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {

  actualizarform: FormGroup;

  actualizarDatosPerfil: ActualizarDatosPerfil;
  cargarDatosPerfil: CargarDatosPerfil;
  datosPerfil: DatosPerfil;
  traerMensajeDatosPerfil: TraerMensajeDatosPerfil;
  login: Login;

  url: string;

  constructor(private perfilService: PerfilService,
              private progressbarService: ProgressbarService,
              private router: Router,
              public route: ActivatedRoute,
              private _snackBar: MatSnackBar,
              private cryptoService: CryptoService,
              private registroLoginService: RegistroLoginService) {
    this.datosPerfil = new DatosPerfil();
    this.actualizarDatosPerfil = new ActualizarDatosPerfil();
    this.actualizarform = new FormGroup({
      UsuarioRegistro: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
      NombreRegistro: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3), Validators.maxLength(25)]),
      ApellidoRegistro: new FormControl('', [Validators.pattern('^[a-zA-Z]+$'), Validators.minLength(3), Validators.maxLength(25)]),
      CorreoRegistro: new FormControl('', [Validators.email]),
      TelefonoRegistro: new FormControl('', [Validators.pattern('^[0-9]+$'), Validators.maxLength(10), ValidacionesPropias.validarTelefono]),

      UsuarioSession: new FormControl(''),
      NombreSession: new FormControl(''),
      ApellidoSession: new FormControl(''),
      CorreoSession: new FormControl(''),
      TelefonoSession: new FormControl(''),

      UsuarioIdSession: new FormControl('')
    })
  }
  setearDatos() {
    this.actualizarform.controls['UsuarioRegistro'].setValue(this.cargarDatosPerfil.datos.usuario);
    this.actualizarform.controls['NombreRegistro'].setValue(this.cargarDatosPerfil.datos.nombre);
    this.actualizarform.controls['ApellidoRegistro'].setValue(this.cargarDatosPerfil.datos.apellido);
    this.actualizarform.controls['CorreoRegistro'].setValue(this.cargarDatosPerfil.datos.correo);
    this.actualizarform.controls['TelefonoRegistro'].setValue(this.cargarDatosPerfil.datos.telefono);

    this.actualizarform.controls['UsuarioSession'].setValue(this.cargarDatosPerfil.datos.usuario);
    this.actualizarform.controls['NombreSession'].setValue(this.cargarDatosPerfil.datos.nombre);
    this.actualizarform.controls['ApellidoSession'].setValue(this.cargarDatosPerfil.datos.apellido);
    this.actualizarform.controls['CorreoSession'].setValue(this.cargarDatosPerfil.datos.correo);
    this.actualizarform.controls['TelefonoSession'].setValue(this.cargarDatosPerfil.datos.telefono);

    this.actualizarform.controls['UsuarioIdSession'].setValue(this.cargarDatosPerfil.datos.id);
  }

  ngOnInit(): void {
    this.postCargarDatosPerfil();
  }

  enviar(f: NgForm) {
    //console.log("Los datos son: ");
    //console.log(f.value);
    this.actualizarDatos(this.actualizarform.value);
  }

  actualizarDatos(actDatosPerf: ActualizarDatosPerfil) {
    this.progressbarService.barraProgreso.next("1");
    this.perfilService.postActualizarDatos(actDatosPerf).subscribe(data => {
      //console.log("TRAIDOS: ");
      //console.log(data);
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;
      if (this.traerMensajeDatosPerfil.mensaje != "Utiliza otro usuario, este ya existe o esta registrado") {
        this.router.navigate(['/perfil']);
      }
      this.openSnackBar(this.traerMensajeDatosPerfil.mensaje,'ACEPTAR');
      this.relogin(actDatosPerf);
      this.progressbarService.barraProgreso.next("2");
    })
  }

  postCargarDatosPerfil() {
    this.progressbarService.barraProgreso.next("1");
    this.url = environment.HOST;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    //console.log(decodedToken.name);

    this.datosPerfil.usuario = decodedToken.name;

    this.perfilService.postCargarDatosPerfil(this.datosPerfil).subscribe(data => {
      this.cargarDatosPerfil = data;
      //console.log(data);
      //console.log(this.cargarDatosPerfil);
      this.setearDatos();
      //this.asignarDatosDefecto();

    })
    this.progressbarService.barraProgreso.next("2");

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  relogin(actDatosPerf: ActualizarDatosPerfil){
    this.login = new Login();
    this.cryptoService.encryptUsingAES256("user",actDatosPerf.UsuarioRegistro);
    this.login.Usuario = actDatosPerf.UsuarioRegistro;
    this.login.Contrasena = this.cryptoService.decryptUsingAES256("userpassword");;
    this.registroLoginService.postIngresoLogin(this.login).subscribe(data=>{
      sessionStorage.setItem(environment.TOKEN, data);
    })
  }



}
