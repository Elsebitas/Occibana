import { ProgressbarService } from './../../../_service/progressbar.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { element } from 'protractor';
import { ListasMunicipios } from './../../../_model/ListasMunicipios';
import { ListasZonas } from './../../../_model/ListasZonas';
import { ListasService } from './../../../_service/listas.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { PanelHotelService } from './../../../_service/panel-hotel.service';
import { Component, OnInit } from '@angular/core';
import { AgregarHotel } from 'src/app/_model/AgregarHotel';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-agregar-hotel',
  templateUrl: './agregar-hotel.component.html',
  styleUrls: ['./agregar-hotel.component.css']
})
export class AgregarHotelComponent implements OnInit {

  view:boolean= true;

   
  public imagePath;
  imgURL: any;
  public message: string;
  imgURL2: any;
  public message2: string;
  imgURL3: any;
  public message3: string;

  extension: string;

  sellersPermitFile: any;

  //base64s
  sellersPermitString: string;

  public listasMunicipios: ListasMunicipios[];
  public listasZonas: ListasZonas[];
  
  agregarHotelForm: FormGroup;

  private id: number;

  constructor(private panelHotelService: PanelHotelService,
              private listasService: ListasService,
              private progressbarService: ProgressbarService,
              private router:Router,
              private snackBar: MatSnackBar) {

    this.id = this.router.getCurrentNavigation().extras.state.idhotel;

    this.agregarHotelForm = new FormGroup({
      nombreH: new FormControl('',[Validators.required,Validators.maxLength(30),Validators.minLength(5)]),
      municipio:new FormControl('',[Validators.required]),
      idMunicipio:new FormControl('',[Validators.required]),
      precioBasica:new FormControl('',[Validators.required]),
      precioDoble:new FormControl('',[Validators.required]),
      precioPremium:new FormControl('',[Validators.required]),
      Descripcion:new FormControl('',[Validators.required]),
      Condicion:new FormControl('',[Validators.required]),
      Checkin:new FormControl('',[Validators.required]),
      Checkout:new FormControl('',[Validators.required]),
      UsuarioEncargadoSession:new FormControl(),
      idUsuario:new FormControl(),
      Idzona:new FormControl('',[Validators.required]),
      Condicionesbioseguridad:new FormControl('',[Validators.required]),
      Direccion:new FormControl('',[Validators.required]),
      imagenPrincipal:new FormControl('',[Validators.required]),
      'imagenPrincipal-extension':new FormControl(),
      imagen2:new FormControl(),
      'imagen2-extension':new FormControl(),
      imagen3:new FormControl(),
      'imagen3-extension':new FormControl(),
    });
   }

  ngOnInit(): void {
    this.setData();
    this.getListasZonas();
    this.getListasMunicipios();
  }

  onFromSubmit(){
    let formularioAgregarHotel = this.agregarHotelForm.value;
    //console.log(formularioAgregarHotel);
    this.postAgregarHotel(formularioAgregarHotel);
  } 


  setData(){
    this.agregarHotelForm.controls['idUsuario'].setValue(this.id);
    this.agregarHotelForm.controls['UsuarioEncargadoSession'].setValue(this.id);
  }

  postAgregarHotel(agregarHotel: AgregarHotel){
    this.progressbarService.barraProgreso.next("1");
    this.panelHotelService.postAgregarHotel(agregarHotel).subscribe(data=>{
      //console.log(data);
      agregarHotel = data; 
      if(agregarHotel.mensaje == "*Imagen aceptada"){
        this.openSnackBar('Hotel agregado','ACEPTAR');        
        this.progressbarService.barraProgreso.next("2");
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/perfil']);
        });        
      }
    })
  }

  getListasZonas(){
    this.listasService.getListasZonas().subscribe(data=>{
      this.listasZonas = data;
      //console.log(data)
    })
  }

  getListasMunicipios(){
    this.listasService.getListasMunicipios().subscribe(data =>{
      this.listasMunicipios = data;
      //console.log(data)
    })
  }    

  openSnackBar(message: string, action: string){
    this.snackBar.open(message, action);
  }

  select(nose){
    this.listasMunicipios.forEach(element => {
      if (nose == element.idmunicipio) {        
        this.agregarHotelForm.controls['municipio'].setValue(element.nombre);
      }
    });
  }

  preview(event: any): void {
    let files: FileList = event.target.files;
    
    if(files.length == 0)
      return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.imgURL = reader.result; 
      }

      this.picked(event);
  }

  preview2(event: any): void {
    let files: FileList = event.target.files;
    
    if(files.length == 0)
      return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.imgURL2 = reader.result; 
      }

      this.picked2(event);
  }

  preview3(event: any): void {
    let files: FileList = event.target.files;
    
    if(files.length == 0)
      return;

      var mimeType = files[0].type;
      if (mimeType.match(/image\/*/) == null) {
        this.message = "Only images are supported.";
        return;
      }

      var reader = new FileReader();
      this.imagePath = files;
      reader.readAsDataURL(files[0]); 
      reader.onload = (_event) => { 
        this.imgURL3 = reader.result; 
      }

      this.picked3(event);
  }

  public picked(event) {
        let fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.sellersPermitFile = file;
        this.handleInputChange(file); //turn into base64   
  }

  public picked2(event) {
        let fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.sellersPermitFile = file;
        this.handleInputChange2(file); //turn into base64   
  }

  public picked3(event) {
        let fileList: FileList = event.target.files;
        const file: File = fileList[0];
        this.sellersPermitFile = file;
        this.handleInputChange3(file); //turn into base64   
  }

  handleInputChange(files) {
    var file = files;
    //console.log(file.type);
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    //console.log(pattern);
    //console.log(file.type);
    let extensioNueva = this.valiadarFormato(file.type);
    this.agregarHotelForm.controls['imagenPrincipal-extension'].setValue(extensioNueva);
    //console.log(extensioNueva);
    reader.onloadend = this._handleReaderLoaded.bind(this);
    reader.readAsDataURL(file);
  }

  handleInputChange2(files) {
    var file = files;
    //console.log(file.type);
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    //console.log(pattern);
    //console.log(file.type);
    let extensioNueva = this.valiadarFormato(file.type);
    this.agregarHotelForm.controls['imagen2-extension'].setValue(extensioNueva);
    //console.log(extensioNueva);
    reader.onloadend = this._handleReaderLoaded2.bind(this);
    reader.readAsDataURL(file);
  }

  handleInputChange3(files) {
    var file = files;
    //console.log(file.type);
    var pattern = /image-*/;
    var reader = new FileReader();
    if (!file.type.match(pattern)) {
      alert('invalid format');
      return;
    }
    //console.log(pattern);
    //console.log(file.type);
    let extensioNueva = this.valiadarFormato(file.type);    
    this.agregarHotelForm.controls['imagen3-extension'].setValue(extensioNueva);
    //console.log(extensioNueva);
    reader.onloadend = this._handleReaderLoaded3.bind(this);
    reader.readAsDataURL(file);
  }

  _handleReaderLoaded(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;    
    this.agregarHotelForm.controls['imagenPrincipal'].setValue(this.sellersPermitString);
    //this.log();
  }

  _handleReaderLoaded2(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;
    this.agregarHotelForm.controls['imagen2'].setValue(base64result);
    //this.log();
  }

  _handleReaderLoaded3(e) {
    let reader = e.target;
    var base64result = reader.result.substr(reader.result.indexOf(',') + 1);
    //this.imageSrc = base64result;
    this.sellersPermitString = base64result;
    this.agregarHotelForm.controls['imagen3'].setValue(base64result);
    //this.log();
  }

  valiadarFormato(exten: string) {
    console.log(exten);
    if (exten == "image/jpeg") {
      this.extension = ".jpeg"
    }
    else if (exten == "image/png") {
      this.extension = ".png"
    }
    else if (exten == "image/jpg") {
      this.extension = ".jpg"
    }
    else {
      this.extension = "Extension no valida";
    }
    return this.extension;
  }

  log() { 
    // for debug
    console.log('base64', this.sellersPermitString);

  }
}
