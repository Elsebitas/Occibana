import { AppModule } from './../../app.module';
import { ProgressbarService } from './../../_service/progressbar.service';
import { CryptoService } from './../../_service/crypto.service';
import { environment } from './../../../environments/environment';
import { Login } from './../../_model/Login';
import { RegistroLoginService } from '../../_service/registroLogin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
/**
 * Clase del componente Login que implementa OnInit.
 */
export class LoginComponent implements OnInit {

  /**
   * Variable que instancia el objeto Login.
   */
  login : Login;

  /**
   * Variable que instancia el objeto FormGroup.
   */
  loginForm: FormGroup;

  /**
   * Variable que almacena el error.
   */
  error: string;

  hide = true;
  /**
   * Constructor que inicializa el formulario, el ServicioLogin y la ruta.
   * 
   * @param formBuilder recibe el objeto FormBuilder.
   * @param loginService recibe el objeto RegistroLoginService.
   * @param router recibe el objeto Router.
   */
  constructor(private formBuilder:FormBuilder,
              private loginService:RegistroLoginService, 
              private router: Router,
              private crypto: CryptoService,
              private progressbarService: ProgressbarService,
              private appModule: AppModule) { }

  /**
   * Método que instancia el formulario con sus validaciones.
   */
  ngOnInit(): void {
    this.error = null;
    this.loginForm = this.formBuilder.group({
      Usuario:['', [ Validators.required ] ],
      Contrasena:['', [ Validators.required ] ],
    })
  }

  /**
   * Método que recibe un formulario y ejecuta el método postIngresoLogin.
   * 
   * @param f recibe el NgForm.
   */
  onFromSubmit(f:NgForm){
    let login = f.value;
    console.log(f.value);
    this.postIngresoLogin(login);
  }

  /**
   * Método que consume el servicio de postIngresoLogin, almacena el token y muestra el error.
   * 
   * @param login recibe el objeto de la clase Login.
   */
  postIngresoLogin(login: Login){
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    this.loginService.postIngresoLogin(login).subscribe(data =>{
      sessionStorage.setItem(environment.TOKEN, data);
      //appModule usuarios
      this.crypto.encryptUsingAES256('user',login.Usuario);
      this.crypto.encryptUsingAES256('userpassword',login.Contrasena);
      /*
      this.appModule.usuario = login.Usuario;
      this.appModule.contra = login.Contrasena;*/
      this.progressbarService.barraProgreso.next("2");
      this.router.navigate(['/inicio']);
    }, err =>{
      console.log(err);
      if(err.status == 401) {
        this.error = 'Usuario y/o cotrasena incorrecta';
      } else {
        //this.router.navigate([`/error/${err.status}/${err.statusText}`]);
      }
  })
  }

}
