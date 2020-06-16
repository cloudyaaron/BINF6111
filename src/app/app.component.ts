import { Component, VERSION } from '@angular/core';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';
import { HashTable } from './classes/hashtable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' + VERSION.major;
  hpoTerms: HashTable<string, any>;
  hpoList = data[0];
  patients = data;
  
  //hpoList = this.hpoTerms;

  constructor() {
    this.hpoTerms = new HashTable<string, any>();
    this.hpoTerms.put('HP:0000118', 'Phenotypic abnormality');
  }
  terms = this.hpoTerms
}
