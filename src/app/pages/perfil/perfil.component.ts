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
import { ActivatedRoute } from '@angular/router';

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
              public route: ActivatedRoute) {     
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

   
  
}
