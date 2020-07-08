import { Component, Input } from "@angular/core";
import data from '../phenotips_2020-06-09_18-16_with_external_id.json';
import { query } from "@angular/animations";

@Component({
  selector: "graph-echart",
  templateUrl: "graph.component.html",
  styleUrls: ["../bootstrap.min.css"]
})
export class graphComponent {
  @Input() patients: Array<any>;
  @Input() chartType: String;
  options: any;

  phenoPool = [];
  freq = [];
  terms = [];
  temp = [];
  
  constructor(){
 
    this.temp.push({query:"all",answer:data})

    this.getPhenotypePool(this.temp)
  }

  


  ngOnChanges(){

    this.freq = []
    this.terms = []
    this.phenoPool=[]
    this.options = {
      title: {
        text: "Frequency of HPO Terms for Filtered Patients",
        show: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: 'category',
        data: this.terms,
        name: 'HPO Terms',
        nameLocation: 'center',
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
         rotate: 45
       }
      },
      yAxis: {
          type: 'value',
          name: 'Frequency of Term',
          nameLocation: 'center',
      },
      series: [
        {
          name: "Patient(s) with Term",
          type: "bar",
          data: this.freq,
          animationDelay: (idx) => idx * 10,
        }
      ],
      animationEasing: 'elasticOut',
      animationDelayUpdate: (idx) => idx * 5,
    }
    
    if (this.patients.length==0){
      this.patients=data
      this.getPhenotypePool(this.temp)
    }else{
      this.getPhenotypePool(this.patients)

    }
    //console.log(this.patients)
  }

  public getPhenotypePool(plist:Array<any>): Array<any>{
    console.log(plist)
    for (var q of plist) {
      for(var p of q['answer']){
        for(var pheno of p['features']){
          if(pheno['observed']=="yes" && this.phenoPool.find(phenotype=> pheno['id']===phenotype['id'])== undefined){
            pheno.count = 1
            this.phenoPool.push(pheno)

          }else if(pheno['observed']=="yes" && this.phenoPool.find(phenotype=> pheno['id']===phenotype['id'])!= undefined){
            var t = this.phenoPool.find(phenotype=> pheno['id']===phenotype['id'])
            t['count'] = t['count']+1
          }
        }
      }
    }

    // Load data for bar graph
    for (var item of this.phenoPool) {
      this.terms.push(item['id'])
      this.freq.push(item['count'])
    }

    return [];
  }
}