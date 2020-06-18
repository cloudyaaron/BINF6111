import { Component, Input} from '@angular/core';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';
import { HashTable } from './classes/hashtable';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' ;
  hpoTerms: HashTable<string, any>;
  hpoList = data[0];
  patients = data;
  values = ''
  patientsLenth = Object.keys(this.patients).length

  onKeyUp(event:any){
    
    for(let i=0; i<this.patientsLenth;i++){
      if(this.patients[i]['report_id'] == event.target.value){
        this.values=this.patients[i]['sex']
        break
      }else{
        this.values=event.target.value
      }
    }
  }
}
