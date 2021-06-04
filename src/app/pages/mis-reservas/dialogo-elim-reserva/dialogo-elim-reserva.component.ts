import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-elim-reserva',
  templateUrl: './dialogo-elim-reserva.component.html',
  styleUrls: ['./dialogo-elim-reserva.component.css']
})
export class DialogoElimReservaComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<DialogoElimReservaComponent>,
      @Inject(MAT_DIALOG_DATA) public idReserva: number) { }

  ngOnInit(): void {
    //console.log(this.idReserva);
  }

  aceptar(): void {
    this.dialogRef.close({
        opcion: "Aceptar"
    });
  }

  cancelar(): void {
    this.dialogRef.close({
      opcion: "Cancelar"
    });
    
  }

}
