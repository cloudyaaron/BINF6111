
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { MessageService } from '../message.service';
import { HPOTerm, Details, Relations, RelationTerm } from '../classes/HPOTerm';

@Component({
  selector: 'HPOapi',
  templateUrl: './api.component.html',
  providers: [ ApiService ],
  styleUrls: [ '../bootstrap.min.css' ]
})

export class ApiComponent {
  @Input('input') input_term: string[];

  error: any;
  headers: string[];
  hpoid: string;
  name: string; 
  /*
  detail_object: Details; 
  relation_object: Relations;
  relationterm: RelationTerm;
  result_object: HPOTerm; 
  */
  haveChildren = true; 
  firstLevelChildren: []; 
  toggle = true; 
  toggleTerm = true;
  //noResuilt = true; 
  @Output() deliever = new EventEmitter();  

  
  constructor(private apiService: ApiService) {}

  showConfig(term:string) {
    this.apiService.getConfig(term)
      .subscribe(
        (data) => {
                    //let detail = {}
                    //this.result_object = new HPOTerm() 
                    if (this.apiService.noResult = false) {
                      this.hpoid = data['details']['id'];
                    
                      if (data['relations']['children'].length == 0) {
                        this.toggleChildren(); 
                      }
                      this.firstLevelChildren = data['relations']['children'];                    
                      this.name = data['details']['name']
                    } else {
                      console.log("the api responds 404")
                    }
                   },
               
      );
  }

  extractInput() {

    if (this.input_term && this.input_term['detail'][0] == 'H') {
        this.showConfig(this.input_term['detail']);
        this.toggleLoad(); 
    } else {
      console.log("It's null!"); 

      this.toggleTermType();
      return; 
    }
  }
  toggleLoad(){this.toggle = !this.toggle};
  toggleChildren(){this.haveChildren = !this.haveChildren}; 
  toggleTermType() {this.toggleTerm = !this.toggleTerm}; 
  checkIfResult() { 
    console.log(this.apiService.noResult)
    return this.apiService.noResult; 
  };
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/