import { Component, Input} from '@angular/core';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';
import { HashTable } from './classes/hashtable';
import {MatChipsModule,MatChipInputEvent} from '@angular/material/chips'
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './bootstrap.min.css' ]
})
export class AppComponent  {
  name = 'Angular ' ;
  hpoTerms: HashTable<string, any>;
  hpoList = data[0];
  patients = data;
  values = ''
  suggest_text=''
  search_result = [];
  patientsLenth = Object.keys(this.patients).length


  //multiple seaching function + ui
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  search_list = [];

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    console.log(this.search_list)
    // Add our fruit
    if ((value || '').trim()) {
      this.search_list.push({detail: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  remove(term: any): void {
    const index = this.search_list.indexOf(term);
    if (index >= 0) {
      this.search_list.splice(index, 1);
    }
  }




  //single searching function
  onKeyUp(event:any){
    this.values=''
    this.search_result=[]
    var user_input = event.target.value.trim();
    console.log(user_input)
    if(user_input[0]=="P"){
      this.suggest_text='Currently search patients id'
      for(let i=0; i<this.patientsLenth;i++){
      if(this.patients[i]['report_id'] == user_input){
        this.values=this.patients[i]['sex']
        break
      }else{
        this.values=event.target.value
      }
    }
    }else if(user_input.slice(0,3)=="HP:"){
      this.suggest_text='Currently search HPO terms'
      for(let i=0; i<this.patientsLenth;i++){
        var pp = this.patients[i]['features']
        for (var phenotype of pp){
          if(phenotype['id'] == user_input){
            this.search_result.push(this.patients[i]['report_id'])
            break
          }
        }
      }
      if(user_input.length==10 && this.search_result.length==0){
        this.search_result=['No patients with this phenotype has been found in data']
      }
      if(user_input.length>=11 ){
        this.search_result=['HPO term should be 7 digits']
      }
    }else if(user_input.length==0){
      this.suggest_text=''
      this.search_result=[]
    }else{
      this.suggest_text='Searching text is unexpected'
    }

  }
}
