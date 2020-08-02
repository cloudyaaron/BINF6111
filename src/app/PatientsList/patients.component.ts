import { Component, Input } from '@angular/core';
//import data from '../phenotips_2020-06-09_18-16_with_external_id.json';
//import { Patient } from './patient';
import { initializePatients } from './patientList';
import {MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'patient-list',
  templateUrl: './patients.component.html',
  styleUrls: [ '../lumen.css' ]
})
export class PatientsList {
  @Input() patients: Array<any> = [];
  @Input() type: String;


  //patientsLength = Object.keys(this.patients).length

  // for JSON input
  //plist = initializePatients(this.patients);
  //can use plist as substitute for "patients = data"

}

