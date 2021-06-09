import { FormControl, ValidationErrors } from '@angular/forms';


export class ValidacionesPropias{

    static validarTelefono(control: FormControl): ValidationErrors {
        let telefono = control.value.substring(0,1);
        if(telefono === '3')
            return null; 
        else {
            return { validarInicialTelefono : true };
        }
    }


    static validarIgualdadContrasena(control: FormControl): ValidationErrors{
        let contrasena = control.get('Contrasena').value; 
        let actcontrasena = control.get('Actcontrasena').value; 

        if (contrasena !== actcontrasena){
            control.get('Actcontrasena').setErrors({NoPasswordsMatch : true});
        }else{
            return null;
        }
    }

    static cambiarContrasena(control: FormControl): ValidationErrors{
        let contrasena = control.get('contrasenaNueva').value; 
        let actcontrasena = control.get('confContrasenaNueva').value; 

        if (contrasena !== actcontrasena){
            control.get('confContrasenaNueva').setErrors({NoPasswordsMatch : true});
        }else{
            return null;
        }
    }

    static verficarCorreos(control: FormControl): ValidationErrors{
        let contrasena = control.get('Correo').value; 
        let actcontrasena = control.get('ConfCorreo').value; 

        if (contrasena !== actcontrasena){
            control.get('ConfCorreo').setErrors({NoEmailMatch : true});
        }else{
            return null;
        }
    }
}