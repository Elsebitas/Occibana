import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../environments/environment';
import { Component } from '@angular/core';
import { RegistroLoginService } from './../app/_service/registroLogin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'occibana';

  constructor(private registroLogin: RegistroLoginService, private router: Router) {}

  postCerrarSesion() {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    this.registroLogin.postCerrarSesion(usuario);
    sessionStorage.removeItem(environment.TOKEN);
    this.router.navigate(['/inicio']);
  }
}
