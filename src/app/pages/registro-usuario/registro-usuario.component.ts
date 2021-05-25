import { ProgressbarService } from './../../_service/progressbar.service';
import { Router } from '@angular/router';
import { RegistroLoginService } from './../../_service/registroLogin.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { RegistroUsuarios } from './../../_model/RegistroUsuarios';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {


  hide = true;
  registroUsarios: RegistroUsuarios;


  /**
   * Variable que instancia el objeto FormGroup.
   */
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
  constructor(private formBuilder: FormBuilder,
    private registroService: RegistroLoginService,
    private router: Router,
    private progressbarService: ProgressbarService) { }

  /**
   * Método que instancia el formulario con sus validaciones.
   */
  ngOnInit(): void {
    this.error = null;
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
  onFromSubmit(f: NgForm) {
    let registroUsuarios = f.value;
    console.log(f.value);
    this.postRegistroUsuarios(registroUsuarios);
  }

  /**
   * Método que consume el servicio de postIngresoLogin, almacena el token y muestra el error.
   * 
   * @param login recibe el objeto de la clase Login.
   */
  postRegistroUsuarios(registroUsuarios: RegistroUsuarios) {
    this.progressbarService.barraProgreso.next("1");
    this.progressbarService.delay();
    console.log(registroUsuarios);
    this.registroService.postRegistroUsuarios(registroUsuarios).subscribe(data => {
      console.log(data);
      this.progressbarService.barraProgreso.next("2");
      this.router.navigate(['/inicio']);
    })   
  }
}
