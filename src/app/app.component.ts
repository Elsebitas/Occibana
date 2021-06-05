import { DialogLemaComponent } from './pages/dialog-lema/dialog-lema.component';
import { DialogVisionComponent } from './pages/dialog-vision/dialog-vision.component';
import { DialogMisionComponent } from './pages/dialog-mision/dialog-mision.component';
import { DiagMisionComponent } from './pages/diag-mision/diag-mision.component';

import { ProgressbarService } from './_service/progressbar.service';
import { Router } from '@angular/router';
import { environment } from './../environments/environment';
import { Component, DoCheck } from '@angular/core';
import { RegistroLoginService } from './../app/_service/registroLogin.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Clase que funciona como Master Page e implementa de DoCheck.
 */
export class AppComponent implements DoCheck{
  barraProgreso: boolean = true;

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
  constructor(private registroLogin: RegistroLoginService, progressbarService: ProgressbarService, private router: Router, public dialogo: MatDialog) {
    progressbarService.barraProgreso.subscribe(data =>{
      if(data == "1")
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
  }

  /**
   * Método que implementa el servicio postCerrarSesion y elimina el token del sessionStorage.
   */
  postCerrarSesion() {
    const usuario = sessionStorage.getItem(environment.TOKEN);
    this.registroLogin.postCerrarSesion(usuario).subscribe(data=>{
      //console.log("cerrar sesion: "+data);
    });
    sessionStorage.removeItem(environment.TOKEN);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('userpassword');
    this.router.navigate(['/login']);
  }

  openDialogMision(){
    const dialogRef = this.dialogo.open(DialogMisionComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  openDialogVision(){
    const dialogRef = this.dialogo.open(DialogVisionComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  openDialogLema(){
    const dialogRef = this.dialogo.open(DialogLemaComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }
  
}
