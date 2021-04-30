import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { Component, DoCheck } from '@angular/core';
import { RegistroLoginService } from './../app/_service/registroLogin.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck{
  title = 'occibana';
  usuario: string;

  constructor(private registroLogin: RegistroLoginService, private router: Router) {}
  ngDoCheck(): void {
    this.usuario = sessionStorage.getItem(environment.TOKEN);
  }

  postCerrarSesion() {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    this.registroLogin.postCerrarSesion(usuario);
    sessionStorage.removeItem(environment.TOKEN);
    this.router.navigate(['/inicio']);
  }
}
