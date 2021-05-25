import { ProgressbarService } from './../../../_service/progressbar.service';
import { TraerMensajeDatosPerfil } from './../../../_model/TraerMensajeDatosPerfil';
import { CargarDatosPerfil } from './../../../_model/CargarDatosPerfil';
import { DatosPerfil } from './../../../_model/DatosPerfil';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ActualizarDatosPerfil } from './../../../_model/ActualizarDatosPerfil';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PerfilService } from 'src/app/_service/perfil.service';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';

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

  url: string;

  constructor(private perfilService: PerfilService,
    private progressbarService: ProgressbarService,
    public route: ActivatedRoute,
    private _snackBar: MatSnackBar) {
    this.datosPerfil = new DatosPerfil();
    this.actualizarDatosPerfil = new ActualizarDatosPerfil();
    this.actualizarform = new FormGroup({
      UsuarioRegistro: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      NombreRegistro: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      ApellidoRegistro: new FormControl('', [Validators.pattern('^[a-zA-Z]+$')]),
      CorreoRegistro: new FormControl('', [Validators.email]),
      TelefonoRegistro: new FormControl('', [Validators.pattern('^[0-9]+$'), Validators.maxLength(10)]),

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
    console.log("Los datos son: ");
    console.log(f.value);
    this.actualizarDatos(this.actualizarform.value);
  }

  actualizarDatos(actDatosPerf: ActualizarDatosPerfil) {
    this.progressbarService.barraProgreso.next("1");
    this.perfilService.postActualizarDatos(actDatosPerf).subscribe(data => {
      console.log("TRAIDOS: ");
      console.log(data);
      this.traerMensajeDatosPerfil = new TraerMensajeDatosPerfil();
      this.traerMensajeDatosPerfil = data;
      this.openSnackBar(this.traerMensajeDatosPerfil.mensaje,'ACEPTAR');
      this.progressbarService.barraProgreso.next("2");
    })
  }

  postCargarDatosPerfil() {
    this.progressbarService.barraProgreso.next("1");
    this.url = environment.HOST;

    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    console.log(decodedToken.name);

    this.datosPerfil.usuario = decodedToken.name;

    this.perfilService.postCargarDatosPerfil(this.datosPerfil).subscribe(data => {
      this.cargarDatosPerfil = data;
      console.log(data);
      console.log(this.cargarDatosPerfil);
      this.setearDatos();
      //this.asignarDatosDefecto();

    })
    this.progressbarService.barraProgreso.next("2");

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }


}
