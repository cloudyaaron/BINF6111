import { Component, Input, OnInit } from "@angular/core";
import data from "../phenotips_2020-06-09_18-16_with_external_id.json";
import { query } from "@angular/animations";
import { MatSelectModule } from "@angular/material/select";

@Component({
  selector: "graph-echart",
  templateUrl: "graph.component.html",
  styleUrls: ["../lumen.css"]
})
export class graphComponent implements OnInit {
  @Input() patients: Array<any>;
  options: any;

  phenoPool = [];
  freq = [];
  terms = [];
  temp = new Array();
  selectType = "Bar";

  ngOnInit() {
    this.temp.push({ query: "all", answer: data });
    this.getPhenotypePool(this.temp);
    this.showBarChart();
  }

  ngOnChanges() {
    this.freq = [];
    this.terms = [];
    this.phenoPool = [];

    if (this.patients.length == 0 || this.patients == undefined) {
      this.patients = data;
      this.getPhenotypePool(this.temp);
    } else {
      this.getPhenotypePool(this.patients);
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
    this.selectType = event.target.value;
    if (this.selectType == "Bar") {
      this.showBarChart();
    } else if (this.selectType == "Pie") {
      console.log("change to pie");
      this.showPieChart();
    } else if (this.selectType == "Sunburst") {
      this.showSunburst();
    }
  }

  showPieChart() {
    this.options = {
      backgroundColor: "#2c343c",

      title: {
        text: "Customized Pie",
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
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: "Demo Pie Chart",
          type: "pie",
          radius: "55%",
          center: ["50%", "50%"],
          data: [
            { value: 335, name: "e1" },
            { value: 310, name: "e2" },
            { value: 274, name: "e3" },
            { value: 235, name: "e4" },
            { value: 400, name: "e5" }
          ].sort(function(a, b) {
            return a.value - b.value;
          }),
          roseType: "radius",
          label: {
            color: "rgba(255, 255, 255, 0.3)"
          },
          labelLine: {
            lineStyle: {
              color: "rgba(255, 255, 255, 0.3)"
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
    var item1 = {
      color: "#F54F4A"
    };
    var item2 = {
      color: "#FF8C75"
    };
    var item3 = {
      color: "#FFB499"
    };

    var data = [
      {
        children: [
          {
            value: 5,
            children: [
              {
                value: 1,
                itemStyle: item1
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                    itemStyle: item2
                  }
                ]
              },
              {
                children: [
                  {
                    value: 1
                  }
                ]
              }
            ],
            itemStyle: item1
          },
          {
            value: 10,
            children: [
              {
                value: 6,
                children: [
                  {
                    value: 1,
                    itemStyle: item1
                  },
                  {
                    value: 1
                  },
                  {
                    value: 1,
                    itemStyle: item2
                  },
                  {
                    value: 1
                  }
                ],
                itemStyle: item3
              },
              {
                value: 2,
                children: [
                  {
                    value: 1
                  }
                ],
                itemStyle: item3
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2
                  }
                ]
              }
            ],
            itemStyle: item1
          }
        ],
        itemStyle: item1
      },
      {
        value: 9,
        children: [
          {
            value: 4,
            children: [
              {
                value: 2,
                itemStyle: item2
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item1
                  }
                ]
              }
            ],
            itemStyle: item1
          },
          {
            children: [
              {
                value: 3,
                children: [
                  {
                    value: 1
                  },
                  {
                    value: 1,
                    itemStyle: item2
                  }
                ]
              }
            ],
            itemStyle: item3
          }
        ],
        itemStyle: item2
      },
      {
        value: 7,
        children: [
          {
            children: [
              {
                value: 1,
                itemStyle: item3
              },
              {
                value: 3,
                children: [
                  {
                    value: 1,
                    itemStyle: item2
                  },
                  {
                    value: 1
                  }
                ],
                itemStyle: item2
              },
              {
                value: 2,
                children: [
                  {
                    value: 1
                  },
                  {
                    value: 1,
                    itemStyle: item1
                  }
                ],
                itemStyle: item1
              }
            ],
            itemStyle: item3
          }
        ],
        itemStyle: item1
      },
      {
        children: [
          {
            value: 6,
            children: [
              {
                value: 1,
                itemStyle: item2
              },
              {
                value: 2,
                children: [
                  {
                    value: 2,
                    itemStyle: item2
                  }
                ],
                itemStyle: item1
              },
              {
                value: 1,
                itemStyle: item3
              }
            ],
            itemStyle: item3
          },
          {
            value: 3,
            children: [
              {
                value: 1
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2
                  }
                ]
              },
              {
                value: 1
              }
            ],
            itemStyle: item3
          }
        ],
        itemStyle: item1
      }
    ];

    this.options = {
      series: {
        radius: ["15%", "80%"],
        type: "sunburst",
        sort: null,
        highlightPolicy: "ancestor",
        data: data,
        label: {
          rotate: "radial"
        },
        levels: [],
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
    // Load data for bar graph

    for (var item of this.phenoPool) {
      this.terms.push(item["id"]);
      this.freq.push(item["count"]);
    }
  }
}
