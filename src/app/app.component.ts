import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { Component, DoCheck } from '@angular/core';
import { RegistroLoginService } from './../app/_service/registroLogin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Clase que funciona como Master Page e implementa de DoCheck.
 */
export class AppComponent implements DoCheck{

  /**
   * Variable que indica el título del aplicativo.
   */
  title = 'occibana';

  /**
   * Variable que indica al usuario.
   */
  usuario: string;

  /**
   * Constructor que inicializa los objetos RegistroLoginService y el router.
   * 
   * @param registroLogin recibe el objeto RegistroLoginService.
   * @param router recibe el objeto Router.
   */
  constructor(private registroLogin: RegistroLoginService, private router: Router) {}

  /**
   * Método que verifica el estado del sessionStorage.
   */
  ngDoCheck(): void {
    this.usuario = sessionStorage.getItem(environment.TOKEN);
  }

  /**
   * Método que implementa el servicio postCerrarSesion y elimina el token del sessionStorage.
   */
  postCerrarSesion() {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    this.registroLogin.postCerrarSesion(usuario);
    sessionStorage.removeItem(environment.TOKEN);
    this.router.navigate(['/inicio']);
  }
}
