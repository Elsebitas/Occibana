import { FormControl, FormGroup } from '@angular/forms';
import { AgregarImagen } from './../../_model/AgregarImagen';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { environment } from 'src/environments/environment';
import { HotelesDestacados } from './../../_model/HotelesDestacados';
import { ListasService } from './../../_service/listas.service';
import { AppModule } from './../../app.module';
import { ProgressbarService } from './../../_service/progressbar.service';
import { CargarDatosPerfil } from './../../_model/CargarDatosPerfil';
import { PerfilService } from './../../_service/perfil.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatosPerfil } from 'src/app/_model/DatosPerfil';
import { ActivatedRoute, Router } from '@angular/router';

let id = {
  idUsuario: 1
}

let idH = {
  idhotel: 1
}

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent implements OnInit {

  public imagePath;

  imgURL: any;

  public message: string;

  public extension: any;

  sellersPermitFile: any;

  //base64s
  sellersPermitString: string;

  cargarDatosPerfil: CargarDatosPerfil;

  agregarImagen: AgregarImagen;

  hotelesDestacados: HotelesDestacados[];

  url: string;

  url2: string;

  url3: string;

  url4: string;

  form: FormGroup;

  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private perfilService: PerfilService,
              private appModule: AppModule,
              private progressbarService: ProgressbarService,
              private listasService: ListasService,
              public route: ActivatedRoute,
              private router: Router,
              private snackBar: MatSnackBar) {
              this.cargarDatosPerfil = new CargarDatosPerfil();
              this.form = new FormGroup({
                usuario: new FormControl(''),
                imagen: new FormControl('',),
                extension: new FormControl('',),
              });
              }
  
  ngOnInit(): void {
    this.url2 = environment.REALHOST;
    this.url3 = environment.URLPHOTOS2;
    this.url4 = environment.URLPHOTOS;
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    this.postCargarDatosPerfil();
  }

  cargarDatos() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    this.form.controls['usuario'].setValue(decodedToken.name);
    this.form.controls['imagen'].setValue(this.sellersPermitString);
    this.form.controls['extension'].setValue(this.extension);
    //console.log(this.form.value);
    let fotoDePerfil = this.form.value;
    this.perfilService.postAgregarImagen(fotoDePerfil).subscribe(data => {
      //console.log(data);
      this.progressbarService.barraProgreso.next("2");
      window.location.reload();
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/perfil']);
      });
    })
  }

  postCargarDatosPerfil() {
    //appModule usuarios
    //console.log("Usuario App Module "+this.appModule.usuario);
    //console.log("Contrase????a App Module "+this.appModule.contra);
    this.url = environment.HOST;
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    //console.log(decodedToken.name);
    let datosPerfil: DatosPerfil;
    datosPerfil = new DatosPerfil();
    datosPerfil.usuario = decodedToken.name;
    this.perfilService.postCargarDatosPerfil(datosPerfil).subscribe(data => {
      this.cargarDatosPerfil = data;
      id.idUsuario = this.cargarDatosPerfil.datos.id;
      let iduser: any = this.cargarDatosPerfil.datos.id;
      localStorage.setItem("iduser", iduser);
      this.postMostrarMisHoteles(id);
      /*
      console.log(data);
      console.log(this.cargarDatosPerfil);
      */
    })
    this.progressbarService.barraProgreso.next("2");
  }

  postMostrarMisHoteles(idUser) {
    this.listasService.postMostrarMisHoteles(idUser).subscribe(data => {
      this.hotelesDestacados = data;
      /*
      console.log("Mis Hoteles");
      console.log(idUser);
      console.log(data);
      */
    })
  }

  postEliminarHotelTabla(idHotel, idUser) {
    idH.idhotel = idHotel;
    this.listasService.postEliminarHotelTabla(idH).subscribe(data => {
      this.abrirSnackBar(data, 'Aceptar');
      //this._snackBar.open(data, 'Aceptar');
      this.postMostrarMisHoteles(idUser);
      this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/perfil']);
      });
    })
  }

  agregarHabitacion(id, nombre, precio) {
    //console.log(id);
    localStorage.setItem("idhotel", id);
    localStorage.setItem("nombreHotel", nombre);
    this.router.navigate(['/perfil/agregar_habitacion']);
  }

  comprarMembresia(id, user, correo) {
    //console.log(id);
    localStorage.setItem("iduser", id);
    localStorage.setItem("correo", correo);
    this.router.navigate(['/perfil/comprarmembresias']);
  }

  mostrarReservasHotel(id) {
    localStorage.setItem("idhotel", id);
    this.router.navigate(['/perfil/reservashotel']);
  }

  agregarHotel() {
    this.router.navigate(['/perfil/agregarhotel']);
  }

  preview(event: any): void {
    let files: FileList = event.target.files;

    if (files.length == 0)
      return;
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }

    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    }

    this.picked(event);
  }

  public picked(event) {
    let fileList: FileList = event.target.files;
    const file: File = fileList[0];
    this.sellersPermitFile = file;
    this.handleInputChange(file); //turn into base64   
  }

  handleInputChange(files) {
    var file = files;
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    //console.log(file);
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
    let extensioNueva = this.valiadarFormato(file.type);
    //console.log(extensioNueva);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;
    this.log();
  }

  log() {
    this.cargarDatos();
    this.progressbarService.barraProgreso.next("1");
  }

  valiadarFormato(exten: string) {
    //console.log(exten);
    if (exten == "image/jpeg") {
      this.extension = ".jpeg"
    }
    else if (exten == "image/png") {
      this.extension = ".png"
    }
    else if (exten == "image/jpg") {
      this.extension = ".jpg"
    }
    else {
      this.extension = "Extension no valida";
    }

    this.agregarImagen.extension = this.extension;
  }

  abrirSnackBar(mensaje: string, accion: string) {
    this.snackBar.open(mensaje, accion, {
      verticalPosition: this.verticalPosition,
      duration: 4000,
    });
  }

}