import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mision',
  templateUrl: './dialog-mision.component.html',
  styleUrls: ['./dialog-mision.component.css']
})

export class DialogMisionComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogMisionComponent>) { }

  ngOnInit(): void {}

  aceptar(): void {
    this.dialogRef.close({
        opcion: "Aceptar"
    });
  }

}
