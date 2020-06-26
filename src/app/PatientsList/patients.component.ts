import { Component } from '@angular/core';
import data from '../phenotips_2020-06-09_18-16_with_external_id.json';

@Component({
  selector: 'patient-list',
  templateUrl: './patients.component.html',
  styleUrls: [ '../bootstrap.min.css' ]
})
export class PatientsList {
  patients = data;
}