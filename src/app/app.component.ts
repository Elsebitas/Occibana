import { RegistroLoginService } from './_service/registroLogin.service';
import { CargarDatosPerfil } from './_model/CargarDatosPerfil';
import { PerfilService } from 'src/app/_service/perfil.service';
import { DatosPerfil } from 'src/app/_model/DatosPerfil';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProgressbarService } from './_service/progressbar.service';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Clase que funciona como Master Page e implementa de DoCheck.
 */
export class AppComponent implements DoCheck {
  barraProgreso: boolean = true;

  /**
   * Variable que indica el título del aplicativo.
   */
  title = 'occibana';

  /**
   * Variable que indica al usuario.
   */
  usuario: string;

  bandera: number =2;

  url: string;
  url2: string;

  cargarDatosPerfil: CargarDatosPerfil;

  /**
   * Constructor que inicializa los objetos RegistroLoginService y el router.
   * 
   * @param registroLogin recibe el objeto RegistroLoginService.
   * @param router recibe el objeto Router.
   */
  constructor(private registroLogin: RegistroLoginService,
              private progressbarService: ProgressbarService,
              private router: Router,
              private perfilService: PerfilService,
              private registroLoginService:RegistroLoginService) {
    this.url2 = environment.REALHOST;
    progressbarService.barraProgreso.subscribe(data => {
      if (data == "1")
        this.barraProgreso = false;
      else
        this.barraProgreso = true;
    });
  }

  /**
   * Método que verifica el estado del sessionStorage.
   */
  ngDoCheck(): void {
    this.usuario = sessionStorage.getItem(environment.TOKEN);
    if(this.bandera != 1){
      this.postCargarDatosPerfil();
    }
  }

  postCargarDatosPerfil() {
    //appModule usuarios
    //console.log("Usuario App Module "+this.appModule.usuario);
    //console.log("Contraseña App Module "+this.appModule.contra);
    if (this.usuario != null) {
      this.bandera = 1;
      this.url = environment.HOST;

      const helper = new JwtHelperService();
      const decodedToken = helper.decodeToken(sessionStorage.getItem(environment.TOKEN));
      //console.log(decodedToken.name);

      let datosPerfil: DatosPerfil;
      datosPerfil = new DatosPerfil();
      datosPerfil.usuario = decodedToken.name;


      this.perfilService.postCargarDatosPerfil(datosPerfil).subscribe(data => {
        this.cargarDatosPerfil = data;
      });
      //console.log(data);
      //console.log(this.cargarDatosPerfil);
    }
  }

  /**
   * Método que implementa el servicio postCerrarSesion y elimina el token del sessionStorage.
   */
  postCerrarSesion() {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    this.registroLogin.postCerrarSesion(usuario).subscribe(data => {
      //console.log("cerrar sesion: "+data);
    });
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userpassword');
    this.router.navigate(['/login']);
  }
}
