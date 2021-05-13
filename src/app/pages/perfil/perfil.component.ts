import { CargarDatosPerfil } from './../../_model/CargarDatosPerfil';
import { environment } from './../../../environments/environment';
import { PerfilService } from './../../_service/perfil.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DatosPerfil } from 'src/app/_model/DatosPerfil';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  cargarDatosPerfil: CargarDatosPerfil;

  url: string;

  constructor(private perfilService: PerfilService) {     
    this.cargarDatosPerfil = new CargarDatosPerfil();
  }

  ngOnInit(): void {
    this.postCargarDatosPerfil();
  }

  postCargarDatosPerfil(){
    console.log("entro!!");
    this.url = environment.HOST;
    
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
    console.log(decodedToken.name);

    let datosPerfil: DatosPerfil;
    datosPerfil = new DatosPerfil();
    datosPerfil.usuario = decodedToken.name;
    this.perfilService.postCargarDatosPerfil(datosPerfil).subscribe(data =>{
      this.cargarDatosPerfil = data;  
      console.log(data);
      console.log(this.cargarDatosPerfil);
    })
  }

}
