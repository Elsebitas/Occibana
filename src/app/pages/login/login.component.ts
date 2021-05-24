import { RegistroUsuarios } from './../../_model/RegistroUsuarios';
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

  hide = true;
  hide2 = true;


  /**
   * Variable que instancia el objeto FormGroup.
   */
  loginForm: FormGroup;
  registroForm: FormGroup;

  /**
   * Variable que almacena el error.
   */
  error: string;

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
    });

    this.registroForm = this.formBuilder.group({
      Nombre: ['', [Validators.required]],
      Apellido: ['', [Validators.required]],
      Correo: ['', [Validators.required]],
      Telefono: ['', [Validators.required]],
      Usuario: ['', [Validators.required]],
      Contrasena: ['', [Validators.required]],
      IdEstado: ['', [Validators.required]],
      FotoPerfil: ['', [Validators.required]],
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

  onFromSubmit2(f:NgForm){
    let registroUsuarios = f.value;
    console.log(f.value);
    this.postRegistroUsuarios(registroUsuarios);
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

  postRegistroUsuarios(registroUsuarios: RegistroUsuarios) {
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    console.log(registroUsuarios);
    this.loginService.postRegistroUsuarios(registroUsuarios).subscribe(data => {
      console.log(data);
      this.progressbarService.barraProgreso.next("2");
      this.router.navigate(['/login']);
    })   
  }

}
