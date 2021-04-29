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
export class LoginComponent implements OnInit {

  login : Login;
  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder,private loginService:RegistroLoginService, private router: Router) { }

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
      sessionStorage.setItem(environment.TOKEN, data);
      const helper = new JwtHelperService();

      const decodedToken = helper.decodeToken(data);
      const expirationDate = helper.getTokenExpirationDate(data);
      const isExpired = helper.isTokenExpired(data); 
      console.log(decodedToken.name);
      this.router.navigate(['/inicio']);
    })
  }

}
