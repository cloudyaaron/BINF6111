
import { Component, Input } from '@angular/core';
import { ApiService } from './api.service';
import { MessageService } from '../message.service';
import { HPOTerm, Details, Relations, RelationTerm } from '../classes/HPOTerm';

@Component({
  selector: 'HPOapi',
  templateUrl: './api.component.html',
  providers: [ ApiService ],
  styles: ['.error {color: red;}'],
})

export class ApiComponent {
  @Input('input') input_term: string[];
  error: any;
  headers: string[];
  hpoid: string;
  name: string; 
  detail_object: Details; 
  relation_object: Relations;
  relationterm: RelationTerm;
  result_object: HPOTerm; 
  toggle = true; 
  
  constructor(private apiService: ApiService) {}

  showConfig(term:string) {
    this.apiService.getConfig(term)
      .subscribe(
        (data) => {
                    console.log('details are:', data['details']);
                    //let detail = {}
                    //this.result_object = new HPOTerm() 
                    this.hpoid = data['details']['id'];
                    this.name = data['details']['name']}, 
               
      );
  }

  extractInput() {
    if (this.input_term != null && this.toggle == true) {
      console.log("not null");
      for (let s of this.input_term) {
        console.log(s["detail"]);
        //this.showConfig(s['detail']); 
      }
    }
    this.toggle = false; 
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/