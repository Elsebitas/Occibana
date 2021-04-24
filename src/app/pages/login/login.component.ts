import { Login } from './../../_model/Login';
import { LoginService } from './../../_service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login : Login;

  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
  }

  postIngresoLogin(){
    this.loginService.postIngresoLogin(this.login).subscribe(data =>{
      console.log(data)
    })
  }

}
