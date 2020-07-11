import { Component } from '@angular/core';
import data from '../phenotips_2020-06-09_18-16_with_external_id.json';
import { Patient } from './patient';
import { initializePatients } from './patientList';

@Component({
  selector: 'patient-list',
  templateUrl: './patients.component.html',
  styleUrls: [ '../bootstrap.min.css' ]
})
export class PatientsList {
  patients = data;
  patientsLength = Object.keys(this.patients).length

  // for JSON input
  //plist = initializePatients(this.patients);
  //can use plist as substitute for "patients = data"

}

