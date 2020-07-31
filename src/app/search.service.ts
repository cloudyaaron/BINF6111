import { Injectable } from '@angular/core';
import { Subject } from 'rxjs'; 
import { HashTable } from './classes/hashtable';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';

@Injectable()
export class SearchService {

  search_list = [];
  hpoTerms: HashTable<string, any>;
  hpoList = data[0];
  patients = data;
  patientsLenth = Object.keys(this.patients).length
  search_result = [];
  values = ''

  search(search_term: string):any{
    console.log('search')
    var index = 0
    for(index;index<this.search_result.length;index++){
      if(search_term==this.search_result[index]['query']){
        console.log(index)
        break
      }
    }
    if(search_term[0]=="P"){
      
      for(let i=0; i<this.patientsLenth;i++){
        
        if(this.patients[i]['report_id'] == search_term){
          console.log(this.patients[i]['report_id'])
          this.search_result[index]['answer'].push(this.patients[i])
          console.log(this.search_result[index]['answer'])
          break
        }
      }
      
    }else if(search_term.slice(0,3)=="HP:"){
      console.log('searching for a hpo term')
      //tried to get the searching terms 
      //this.apiService.storeConfig(search_term['detail']) 
      for(let i=0; i<this.patientsLenth;i++){
        var pp = this.patients[i]['features']
        for (var phenotype of pp){
          if(phenotype['id'] == search_term&&phenotype['observed']=='yes'){
            //if(this.check_result(this.patients[i])== true){
              this.search_result[index]['answer'].push(this.patients[i])
              
              
            //}
            break
          }
        }
      }
      //if(search_term['detail'].length==10 &&            this.search_result.length==0){
      if(search_term.length==10 && this.search_result.length==0){
        this.search_result=[]
      }
      if(search_term.length>=11 ){
        this.values = "HPO term format incorrect"
        this.search_list.pop(); 
        }; 
        
      }
    }

    
  }

