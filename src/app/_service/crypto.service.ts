import { AppModule } from './../app.module';
import { Observable } from 'rxjs';
import { Injectable, Pipe } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { Login } from '../_model/Login';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  private tokenFromUI: string = "occibana20010209";
  encrypted: any ="";
  decrypted: string;

  request: string;
  responce: string;
  constructor(private appModule: AppModule) {
    
  }
  
  encryptUsingAES256(titulo: string, datosUser: string) {
    
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(datosUser), _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      });
    this.encrypted = encrypted.toString();  
    // intento de variable app module
    /*if (titulo == 'user') {
      this.appModule.usuario = this.encrypted;
    }else if(titulo == 'userpassword'){
      this.appModule.contra = this.encrypted;
    }*/
    sessionStorage.setItem(titulo, this.encrypted);
  }
  decryptUsingAES256(titulo: string){    
    // intento de variable app module
    /*let datosEncrypt = '';
    if (titulo == 'user') {      
      datosEncrypt = this.appModule.usuario;
      this.encrypted = this.appModule.usuario;
    }else if(titulo == 'userpassword'){
      datosEncrypt = this.appModule.contra;
      this.encrypted = this.appModule.contra;
    }*/
    let datosEncrypt = sessionStorage.getItem(titulo);
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    this.encrypted = sessionStorage.getItem(titulo);
    datosEncrypt = CryptoJS.AES.decrypt(
      this.encrypted, _key, {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
      }).toString(CryptoJS.enc.Utf8);
    return datosEncrypt.replace(/["]/g, '');
  }
}
