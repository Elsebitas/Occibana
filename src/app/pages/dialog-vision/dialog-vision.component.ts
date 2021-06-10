import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-vision',
  templateUrl: './dialog-vision.component.html',
  styleUrls: ['./dialog-vision.component.css']
})

export class DialogVisionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogVisionComponent>) { }

  ngOnInit(): void {}

  aceptar(): void {
    this.dialogRef.close({
        opcion: "Aceptar"
    });
  }

}
