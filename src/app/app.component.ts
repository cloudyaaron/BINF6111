import { Component, Input} from '@angular/core';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';
import { Config, ApiService } from './HPOapi/api.service';
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
  typeR='R'
  intersection_check = false

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
      this.search_result.push({query:value.trim(),answer:[]});
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
    this.refreshPage()
    
  }

  refreshPage(){
    this.values=""
    this.search_result=[]
    console.log(this.search_list)
    console.log(this.search_result)
    if (this.search_list.length!= 0){
      for (var search_term of this.search_list){
        this.search_result.push({query:search_term['detail'],answer:[]});
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
    var index = 0
    for(index;index<this.search_result.length;index++){
      if(search_term['detail']==this.search_result[index]['query']){
        
        break
      }
    }
    if(search_term['detail'][0]=="P"){
      
      for(let i=0; i<this.patientsLenth;i++){
        
        if(this.patients[i]['report_id'] == search_term['detail']){
          
          this.search_result[index]['answer'].push(this.patients[i])
          break
        }
      }
      
    }else if(search_term['detail'].slice(0,3)=="HP:"){
      console.log('searching for a hpo term')
      //tried to get the searching terms 
      //this.apiService.storeConfig(search_term['detail']) 
      for(let i=0; i<this.patientsLenth;i++){
        var pp = this.patients[i]['features']
        for (var phenotype of pp){
          if(phenotype['id'] == search_term['detail']&&phenotype['observed']=='yes'){
            //if(this.check_result(this.patients[i])== true){
              this.search_result[index]['answer'].push(this.patients[i])
              
              
            //}
            break
          }
        }
      }
      if(search_term['detail'].length==10 &&            this.search_result.length==0){
        this.search_result=[]
      }
      if(search_term['detail'].length>=11 ){
        this.values = "HPO term format incorrect"
        this.search_list.pop()
        
      }
    }

    
  }

  getResultNum(){
    var r=0
    if(this.search_result.length==0){
      return 0
    }
    for(var search_term of this.search_result){
      r = search_term['answer'].length + r
    }
    return r
  }
 
  //return false when already have patient
  check_result(p:any,plist:Array<any>):Boolean{
    
    if (plist.length==0){
      return true
    }
    for(var term of plist){
      if(p['report_id']==term['report_id']){
        return false
      }
    }
    return true;
  }


  remove(term: any): void {
    console.log('removing'+term)
    const index = this.search_list.indexOf(term);
    if (index >= 0) {
      this.search_list.splice(index, 1);
    }
    this.refreshPage()
  }

  onIntersection(toggle:Event){
    if (this.intersection_check==false){
      this.refreshPage()
      return 
    }
    if(this.getResultNum()==0 || this.search_result.length==0){
      this.values="can not find intersection"
      //toggle.
      this.intersection_check=false
    } else {
      var search = 'combined'
      this.search_result.push({query:search.trim(),answer:[]});

    }
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
