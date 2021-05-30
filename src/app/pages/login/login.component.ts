import { MatDialog } from '@angular/material/dialog';
import { RegistroUsuarios } from './../../_model/RegistroUsuarios';
import { AppModule } from './../../app.module';
import { ProgressbarService } from './../../_service/progressbar.service';
import { CryptoService } from './../../_service/crypto.service';
import { environment } from './../../../environments/environment';
import { Login } from './../../_model/Login';
import { RegistroLoginService } from '../../_service/registroLogin.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators, FormControl } from '@angular/forms';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { RecuperarConstrasenaComponent } from './recuperar-constrasena/recuperar-constrasena.component';

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
  error2: string;

  
  

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
              private appModule: AppModule,
              private dialogo : MatDialog) { 

                this.loginForm = new FormGroup({
                  Usuario: new FormControl('', [Validators.required, Validators.maxLength(20)]),
                  Contrasena: new FormControl('', Validators.required),
                });
            
                this.registroForm = new FormGroup({
                  Nombre: new FormControl('', [Validators.required,Validators.maxLength(20),Validators.pattern('^[a-zA-Z]+$')]),
                  Apellido: new FormControl('', [Validators.required, Validators.maxLength(20),Validators.pattern('^[a-zA-Z]+$')]),
                  Correo: new FormControl('', [Validators.required, Validators.maxLength(50),Validators.email]),
                  Telefono: new FormControl('', [Validators.required,Validators.maxLength(10),Validators.pattern('^[0-9]+$'),Validators.minLength(10)]),
                  Usuario: new FormControl('', [Validators.required,Validators.maxLength(20)]),
                  Contrasena: new FormControl('', [Validators.required]),
                  Actcontrasena: new FormControl('', [Validators.required]),
                  IdEstado: new FormControl('', ),
                  FotoPerfil: new FormControl('',),
                });
              }

  /**
   * Método que instancia el formulario con sus validaciones.
   */
  ngOnInit(): void {
    this.error = null;  
    this.error2 = null;  
  }

  /**
   * Método que recibe un formulario y ejecuta el método postIngresoLogin.
   * 
   * @param f recibe el NgForm.
   */
  onFromSubmit(){
    let formularioLogin = this.loginForm.value;
    this.postIngresoLogin(formularioLogin);
  }

  onFromSubmit2(){
    let registroUsuarios = this.registroForm.value;
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
      if(err.status == 400) {
        this.error = 'Usuario y/o cotrasena incorrecta';
        this.progressbarService.barraProgreso.next("2");
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
      this.error2 = data;
      this.progressbarService.barraProgreso.next("2");
      this.router.navigate(['/login']);
    })
    this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
  });   
  }

  dialogoRecuperarContrasena(){
    //usuario: string, correo: string
    const dialogRef = this.dialogo.open(RecuperarConstrasenaComponent, {
      width: '400px',
//      data: {idReserva: idReserva}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.opcion == "Aceptar") {
          //console.log("se llama el servicio de para eliminar reserva");
          //id.idReserva = idReserva;
          //this.cancelarReserva(id);
          //this.abrirSnackBar('Reserva cancelada con éxito', 'Aceptar');
      }
    });
  }

}
