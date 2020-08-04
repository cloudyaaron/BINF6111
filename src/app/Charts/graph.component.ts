import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import data from "../phenotips_2020-06-09_18-16_with_external_id.json";
import { query } from "@angular/animations";
import { MatSelectModule } from "@angular/material/select";
import { ApiService } from "../HPOapi/api.service";
import { delay } from "rxjs/operators";
import js from "./treeWithP.json";
import { graphic } from "echarts";

@Component({
  selector: "graph-echart",
  templateUrl: "graph.component.html",
  styleUrls: ["../lumen.css"]
})
export class graphComponent implements OnInit {
  @Input() patients: Array<any>;
  options: any;
  @Output() result = new EventEmitter<any>();
  phenoPool = [];
  freq = [];
  terms = [];
  temp = new Array();
  selectType = "Bar";
  m = 0;
  f = 0;
  u = 0;
  tree = [];
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.temp.push({ query: "all", answer: data });
    this.getPhenotypePool(this.temp);
    this.showBarChart();
  }

  ngOnChanges() {
    console.log("changes==");
    if (this.selectType != "Sunburst") {
      this.freq = [];
      this.terms = [];
      this.phenoPool = [];
      this.m = 0;
      this.f = 0;
      this.u = 0;
      if (this.patients.length == 0 || this.patients == undefined) {
        //this.patients = data;
        this.getPhenotypePool(this.temp);
      } else {
        this.getPhenotypePool(this.patients);
      }
      if (this.selectType == "Bar") {
        this.showBarChart();
      } else if (this.selectType == "Pie") {
        this.showPieChart();
      } else if (this.selectType == "Sunburst") {
        this.showSunburst();
      } else {
        this.showTreeChart('orthogonal');
      }
    }

    //console.log(this.patients)
  }

  public getPhenotypePool(plist: Array<any>): Array<any> {
    //console.log("extractPHpool",plist);
    for (var q of plist) {
      for (var p of q["answer"]) {
        for (var pheno of p["features"]) {
          if (
            pheno["observed"] == "yes" &&
            this.phenoPool.find(phenotype => pheno["id"] === phenotype["id"]) ==
              undefined
          ) {
            pheno.count = 1;
            this.phenoPool.push(pheno);
          } else if (
            pheno["observed"] == "yes" &&
            this.phenoPool.find(phenotype => pheno["id"] === phenotype["id"]) !=
              undefined
          ) {
            var t = this.phenoPool.find(
              phenotype => pheno["id"] === phenotype["id"]
            );
            t["count"] = t["count"] + 1;
          }
        }
      }
    }

    return [];
  }
  changeChartType(event: any) {
    this.freq = [];
    this.terms = [];
    this.f = 0;
    this.m = 0;
    this.u = 0;
    this.selectType = event.target.value;
    if (this.selectType == "Bar") {
      
      this.showBarChart();
    } else if (this.selectType == "Pie") {
      this.showPieChart();
    } else if (this.selectType == "Sunburst") {
      this.showSunburst();
    } else {
      this.showTreeChart('orthogonal');
    }
  }
  changetree(event) {
    this.selectType = event.target.value;
    if (this.selectType == "normal") {
      this.showTreeChart('orthogonal');
      this.selectType='tree';
    } else if (this.selectType == "circle") {
      this.showTreeChart("radial");
      this.selectType='tree';
    }
  }

  onChartClick(event) {
    this.result.emit(event);
  }
  showPieChart() {
    let plist = this.temp;
    if (this.patients.length == 0 || this.patients == undefined) {
      plist = this.temp;
    } else {
      plist = this.patients;
    }

    let i = 0;
    console.log(plist);
    for (var q of plist) {
      for (var p of q["answer"]) {
        i = i + 1;
        if (p["sex"] == "M") {
          this.m = this.m + 1;
        } else if (p["sex"] == "F") {
          this.f = this.f + 1;
        } else if (p["sex"] == "U") {
          this.u = this.u + 1;
        }
      }
    }
    this.options = {
      backgroundColor: "#FFFFFF",
      title: {
        text: "Patients Gender Distribution",
        left: "center",
        top: 20,
        textStyle: {
          color: "#ccc"
        }
      },

      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },

      visualMap: {
        show: false,
        min: 0,
        max: this.m + this.f + this.u,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: "Pie Chart",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: this.f, name: "Female" },
            { value: this.m, name: "Male" },
            { value: this.u, name: "Unknown" }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(0, 0, 0, 1)"
          },
          labelLine: {
            lineStyle: {
              color: "rgba(0, 0, 0, 0.5)"
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: "#c23531",
            shadowBlur: 200,
            shadowColor: "rgba(0, 0, 0, 0.5)"
          },

          animationType: "scale",
          animationEasing: "elasticOut",
          animationDelay: function(idx) {
            return Math.random() * 200;
          }
        }
      ]
    };
  }

  showSunburst() {
    //this.tree = this.getTree("HP:0000001");
    console.log(js);

    var item1 = {
      color: "#F54F4A"
    };
    var item2 = {
      color: "#FF8C75"
    };
    var item3 = {
      color: "#FFB499"
    };

    var data = js;

    this.options = {
      tooltip: {
        show: true,
        formatter: para => {
          return (
            para["data"]["hpoid"] +
            "<br>" +
            para["data"]["name"] +
            "<br> Patients: " +
            para["data"]["nP"]
          );
        }
      },
      series: {
        hightlight: {
          itemStyle: {
            item3
          }
        },
        radius: ["5%", "90%"],
        type: "sunburst",
        sort: null,
        highlightPolicy: "ancestor",
        data: data,
        label: {
          show: false
        },
        nodeClick: "rootToNode",
        itemStyle: {
          color: "#ddd",
          borderWidth: 2
        }
      }
    };
  }
  showTreeChart(t:string) {
    var data = js;

    this.options = {
      tooltip: {
        show: true,
        formatter: para => {
          return (
            para["data"]["hpoid"] +
            "<br>" +
            para["data"]["name"] +
            "<br> Patients: " +
            para["data"]["nP"]
          );
        }
      },
      series: {
        layout: t,

        symbol: "emptyCircle",
        left: "10%",
        right: "25%",
        top: "18%",
        bottom: "18%",
        symbolSize: 1,
        initialTreeDepth: 2,
        type: "tree",
        sort: null,
        highlightPolicy: "ancestor",
        data: data,
        label: {
          show: false
        },
        nodeClick: "rootToNode",
        itemStyle: {
          color: "#ddd",
          borderWidth: 2
        }
      }
    };
  }
  showBarChart() {
    this.options = {
      title: {
        text: "Frequency of HPO Terms for Filtered Patients",
        show: true
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        },
        formatter: params => {
          return (
            params[0].axisValue +
            ":<br>" +
            params[0].data["termname"] +
            "<br> hits:" +
            params[0].data["value"]
          );
        }
      },
      xAxis: {
        type: "category",
        data: this.terms,
        name: "HPO Terms",
        nameLocation: "center",
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          rotate: 45
        }
      },
      yAxis: {
        type: "value",
        name: "Frequency of Term",
        nameLocation: "center"
      },
      series: [
        {
          name: "Patient(s) with Term",
          type: "bar",
          data: this.freq,
          animationDelay: idx => idx * 10
        }
      ],
      animationEasing: "elasticOut",
      animationDelayUpdate: idx => idx * 5
    };
    for (var item of this.phenoPool) {
      this.terms.push(item["id"]);
      this.freq.push({ value: item["count"], termname: item["label"] });
    }
    // Load data for bar graph
  }
}