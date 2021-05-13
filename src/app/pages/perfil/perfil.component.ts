import { environment } from './../../../environments/environment';
import { PerfilService } from './../../_service/perfil.service';
import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  constructor(private perfilService: PerfilService) { }

  ngOnInit(): void {
  }

  postCargarDatosPerfil(){
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(environment.TOKEN);
    console.log(decodedToken.name);
    this.perfilService.postCargarDatosPerfil(decodedToken).subscribe(data =>{
      console.log(data);
    })
  }

}
