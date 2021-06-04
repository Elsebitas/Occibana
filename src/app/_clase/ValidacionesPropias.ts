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
}