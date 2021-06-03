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

let id={
  idUsuario:1
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

  sellersPermitFile: any;

  //base64s
  sellersPermitString: string;

  cargarDatosPerfil: CargarDatosPerfil;

  hotelesDestacados:HotelesDestacados[];

  url: string;
  url2: string;

  constructor(private perfilService: PerfilService, 
              private progressbarService:ProgressbarService,
              private listasService:ListasService,    
              public route: ActivatedRoute,
              private router: Router) {     
    this.cargarDatosPerfil = new CargarDatosPerfil();
  }

  ngOnInit(): void {
    this.url2 = environment.REALHOST;
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    this.postCargarDatosPerfil();
  }

  postCargarDatosPerfil(){
    
    console.log("entro!!");
    /*/appModule usuarios
    console.log("Usuario App Module "+this.appModule.usuario);
    console.log("Contraseña App Module "+this.appModule.contra);*/
    this.url = environment.HOST;
    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    console.log(decodedToken.name);

    let datosPerfil: DatosPerfil;
    datosPerfil = new DatosPerfil();
    datosPerfil.usuario = decodedToken.name;


    this.perfilService.postCargarDatosPerfil(datosPerfil).subscribe(data =>{
      this.cargarDatosPerfil = data;        
      id.idUsuario = this.cargarDatosPerfil.datos.id;
      this.postMostrarMisHoteles(id);
      console.log(data);
      //console.log(this.cargarDatosPerfil);
    })
    this.progressbarService.barraProgreso.next("2");
  }

  postMostrarMisHoteles(idUser){
    this.listasService.postMostrarMisHoteles(idUser).subscribe(data=>{
      this.hotelesDestacados = data;
      console.log("Mis Hoteles");
      console.log(idUser);
      console.log(data);
    })
  }

   
  agregarHabitacion(id){
    console.log(id);
    this.router.navigate(['/perfil/agregar_habitacion'], { state:{ idhotel: id} });
  }

  comprarMembresia(id, user, correo){
    console.log(id);
    this.router.navigate(['/perfil/comprarmembresias'], { state:{ id: id, usuario: user, correo: correo} });
  }

  preview(event: any): void {
    let files: FileList = event.target.files;
    
    if(files.length == 0)
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
    console.log(file.type);
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    console.log(pattern);
    console.log(file.type);
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }
  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;
    this.log();
  }

  log() { 
    // for debug
    console.log('base64', this.sellersPermitString);

  }
  
}
