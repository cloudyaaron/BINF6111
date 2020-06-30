import { Component, Input} from '@angular/core';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';
import { ApiService } from './HPOapi/api.service';
import { HashTable } from './classes/hashtable';
import {MatChipsModule,MatChipInputEvent} from '@angular/material/chips'
import {COMMA, ENTER} from '@angular/cdk/keycodes';
//https://bootswatch.com/litera/?

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
  showConfig = true;
  
  constructor(private apiService: ApiService) {}
  //multiple seaching function + ui
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  search_list = [];

  add(event: MatChipInputEvent): void {
    this.search_result=[]
    const input = event.input;
    const value = event.value;

    // Add label
    if ((value || '').trim()) {
      this.search_list.push({detail: value.trim()});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.refreshPage()
    console.log(this.search_list)
  }

  refreshPage(){
    this.values=""
    this.search_result=[]
    console.log(this.search_result)
    if (this.search_list.length!= 0){
      for (var search_term of this.search_list){
        this.search(search_term)
      }
    }else if(this.search_list.length == 0){
      this.search_result=[]
    }
    if(this.search_list.length != 0 && this.search_result.length == 0){
      this.values="Sorry but nothing has been found"
    }
  
  }

  search(search_term: string):any{

    if(search_term['detail'][0]=="P"){
      
      for(let i=0; i<this.patientsLenth;i++){
        console.log(this.patients[i]['report_id'])
        if(this.patients[i]['report_id'] == search_term['detail']){
          
          this.search_result.push(this.patients[i]['sex'])
          break
        }
      }
      return(null)
    }else if(search_term['detail'].slice(0,3)=="HP:"){
      console.log('searching for a hpo term')
      //tried to get the searching terms 
      //this.apiService.storeConfig(search_term['detail']) 
      for(let i=0; i<this.patientsLenth;i++){
        var pp = this.patients[i]['features']
        for (var phenotype of pp){
          if(phenotype['id'] == search_term['detail']&&phenotype['observed']=='yes'){
            this.search_result.push(this.patients[i]['report_id'])
            break
          }
        }
      }
      if(search_term['detail'].length==10 &&            this.search_result.length==0){
        this.search_result=[]
      }
      if(search_term['detail'].length>=11 ){
        this.search_result=['HPO term should be 7 digits']
      }
    }
    
  }

  remove(term: any): void {
    const index = this.search_list.indexOf(term);
    if (index >= 0) {
      this.search_list.splice(index, 1);
    }
    this.refreshPage()
  }


  //single searching function will be integret into multiple seaching function 
  // suggest from here!!!
  onKeyUp(event:any){
    
    
    var user_input = event.target.value.trim();
    console.log(user_input)
    if(user_input[0]=="P"){
          this.suggest_text='Currently search patients id'
    }else if(user_input.slice(0,3)=="HP:"){
      this.suggest_text='Currently search HPO terms'
      
    }else if(user_input.length==0){
      this.suggest_text=''
      
    }else{
      this.suggest_text='Searching text is unexpected'
    }


  }
      toggleConfig() { this.showConfig = !this.showConfig; }

      
}
