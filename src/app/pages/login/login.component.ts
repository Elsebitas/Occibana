import { Login } from './../../_model/Login';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : Login;
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private loginService:LoginService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      Usuario:['', [ Validators.required ] ],
      Contrasena:['', [ Validators.required ] ],
    })
  }

  onFromSubmit(f:NgForm){
    let login = f.value;
    console.log(f.value);
    this.postIngresoLogin(login);
  }

  postIngresoLogin(login: Login){
    this.loginService.postIngresoLogin(login).subscribe(data =>{
      console.log(data);
    })
  }

}
