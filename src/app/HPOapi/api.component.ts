
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from './api.service';
import { MessageService } from '../message.service';
import { HPOTerm, Details, Relations, RelationTerm } from '../classes/HPOTerm';

export interface QueryResult {
  name: [],
  ontologyId:[]
}

@Component({
  selector: 'HPOapi',
  templateUrl: './api.component.html',
  providers: [ ApiService ],
  styleUrls: [ '../lumen.css' ]
})

export class ApiComponent {
  @Input('input') input_term: string[];
  @Output() extra = new EventEmitter<any>();
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
  showChildren = true; 
  firstLevelChildren: []; 
  toggle = true; 
  toggleTerm = true;
  noResult = false; 
  isNaturalLanguage = false; 
  naturalLanguage_result: any[]; 

  @Output() deliever = new EventEmitter();  

  
  constructor(private apiService: ApiService) {}

  showHPOTermConfig(term:string) {
    this.apiService.getConfig(term)
      .subscribe(
        (data) => {
                    //let detail = {}
                    //this.result_object = new HPOTerm() 
                    
                      this.hpoid = data['details']['id'];
                      //if there is no children
                      if (data['relations']['children'].length == 0) {
                        this.toggleChildren(); 
                      }
                      this.firstLevelChildren = data['relations']['children'];                    
                      this.name = data['details']['name']
                   },               
      );
  }

  showQueryConfig(term:string) {
    this.apiService.getConfig(term)
      .subscribe(
        (data) => {
                    //let detail = {}
                    //this.result_object = new HPOTerm() 
                      this.naturalLanguage_result = data['terms'];
                      console.log(this.naturalLanguage_result);
                   },
               
      );
  }

  AddToSearch(term){
    this.extra.emit(term)
  }

  AddAll(){
    for(var term of this.firstLevelChildren){
      this.AddToSearch(term['ontologyId'])
    }
  }
  extractInput() {
    if (this.input_term) {
        let input_detail = this.input_term['detail']
        if (this.apiService.isHPOTerm(input_detail)) {
            this.showHPOTermConfig(input_detail);
            this.toggleLoad(); 
        } else if (this.apiService.isPatient(input_detail)) {
            console.log("patient case; ignore")
            this.toggleTermType();
            return;
        } else {
          console.log("natural language case")
          this.showQueryConfig(input_detail);
          this.toggleLoad(); 
          this.toggleQuery();
          //this.printQueryResult();
        }        
    } else {
      console.log("input term is null!"); 
      return; 
    }
  }

printQueryResult() {
  console.log(this.naturalLanguage_result);
  
}
  toggleLoad(){this.toggle = !this.toggle};
  toggleChildren(){this.haveChildren = !this.haveChildren}; 
  toggleTermType() {this.toggleTerm = !this.toggleTerm}; 
  toggleQuery() {this.isNaturalLanguage = !this.isNaturalLanguage};
  /*
  checkIfResult() { 
    console.log(this.apiService.noResult)
    return this.apiService.noResult; 
  };
  */
}

//just comment for change 
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/