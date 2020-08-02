import { Component, Input,Inject } from "@angular/core";
//import data from '../phenotips_2020-06-09_18-16_with_external_id.json';
//import { Patient } from './patient';
import { initializePatients } from "./patientList";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogModule
} from "@angular/material/dialog";


export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: "patient-list",
  templateUrl: "./patients.component.html",
  styleUrls: ["../lumen.css"]
})
export class PatientsList {
  @Input() patients: Array<any> = [];
  @Input() type: String;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'test.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
