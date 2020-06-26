import { Component, Input } from '@angular/core';

@Component({
  selector: 'patient-list',
  templateUrl: './patients.component.html',
  styleUrls: [ '../bootstrap.min.css' ]
})
export class PatientsList {
  @Input() patients: Array<any>;
  @Input() type: String;

}