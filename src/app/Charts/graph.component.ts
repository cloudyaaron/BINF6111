import { Component, Input, OnInit } from "@angular/core";
import { EChartOption } from "echarts";

@Component({
  selector: "graph-echart",
  templateUrl: "graph.component.html",
  styleUrls: ["../bootstrap.min.css"]
})
export class graphComponent implements OnInit {
  @Input() patients: Array<any>;
  @Input() chartType: String;

  phenoPool = [];
  freq = [];
  terms = [];

  ngOnInit() {
    this.ngOnChanges()
  }

  ngOnChanges(){
    this.freq = []
    this.terms = []
    this.phenoPool=[]
    this.getPhenotypePool()
  }

  chartOption: EChartOption = {
    xAxis: {
        type: 'category',
        data: this.terms
    },
    yAxis: {
        type: 'value'
    },
    series: [
      {
        type: "bar",
        data: this.freq
      }
    ]
  };

  public getPhenotypePool(): Array<any>{
    for (var q of this.patients) {
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

    for (var item of this.phenoPool) {
      this.terms.push(item['id'])
      this.freq.push(item['count'])
    }

    return [];
  }
}