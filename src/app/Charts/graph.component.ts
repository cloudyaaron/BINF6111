import { Component, Input, AfterViewInit} from "@angular/core";
import { getInstanceByDom, connect } from 'echarts';

@Component({
  selector: "graph-echart",
  templateUrl: "graph.component.html",
  styleUrls: ["../bootstrap.min.css"]
})
export class graphComponent implements AfterViewInit {
  @Input() patients: Array<any>;
  @Input() chartType: String;
  bar: any;
  pie: any;

  phenoPool = [];
  freq = Array<number>();
  terms = Array<string>();
  pieData = [];

  ngOnChanges(){
    this.freq = []
    this.terms = []
    this.phenoPool=[]
    this.getPhenotypePool()
    this.bar = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      xAxis: {
        type: 'category',
        data: this.terms,
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
         rotate: 45
       },
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
    this.pie = {
      tooltip: {
        trigger: "item"
      },
      visualMap: {
        show: false,
        min: Math.min(...this.freq),
        max: Math.max(...this.freq),
        type: 'continuous',
        inRange: {
          color: ['#c23531'],
          colorLightness: [0.3, 1]
        }
      },
      series: [{
        name: "HPO Tag: Freq",
        type: "pie",
        data: this.pieData.sort(function (a, b) { return a.value - b.value; }),
        radius: ['50%', '90%'],
        roseType: 'radius',
        labelLine: {
          show: false
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
            label: {
                show: true,
                fontSize: '30',
                fontWeight: 'bold'
            }
        }
      }],
    }

    setTimeout(() => {
      const barElement = document.getElementById('barChart') as HTMLDivElement;
      const pieElement = document.getElementById('pieChart') as HTMLDivElement;
      const barChart = getInstanceByDom(barElement);
      const pieChart = getInstanceByDom(pieElement);
      connect([barChart, pieChart]);
    });
  }

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

    // Load data for bar graph
    for (var item of this.phenoPool) {
      this.terms.push(item['id'])
      this.freq.push(item['count'])
      this.pieData.push({'value': item['count'], 'name':item['id']})
    }

    return [];
  }

  ngAfterViewInit() {
    setTimeout(() => {
      const barElement = document.getElementById('barChart') as HTMLDivElement;
      const pieElement = document.getElementById('pieChart') as HTMLDivElement;
      const barChart = getInstanceByDom(barElement);
      const pieChart = getInstanceByDom(pieElement);
      connect([barChart, pieChart]);
    });
  }
}