import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-lema',
  templateUrl: './dialog-lema.component.html',
  styleUrls: ['./dialog-lema.component.css']
})
export class DialogLemaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogLemaComponent>) { }

  ngOnInit(): void {
  }

  aceptar(): void {
    this.dialogRef.close({
        opcion: "Aceptar"
    });
  }

}
