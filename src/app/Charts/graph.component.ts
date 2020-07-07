import { Component, Input } from "@angular/core";
import { EChartOption } from "echarts";

@Component({
  selector: "graph-echart",
  templateUrl: "graph.component.html",
  styleUrls: ["../bootstrap.min.css"]
})

export class graphComponent {
  chart_data = [
    {
      name: "Grandpa",
      children: [
        {
          name: "Uncle Leo",

          children: [
            { name: "Cousin Jack", value: 5 },
            {
              name: "Cousin Mary",
              value: 5,
              children: [{ name: "Jackson", value: 2 }]
            }
          ]
        }
      ]
    }
  ];
  chartOption: EChartOption = {
    series: [
      {
        type: "sunburst",
        data: this.chart_data,
        radius: [0, "90%"],
        highlightPolicy: "ancestor",
        nodeClick: "link",
        label: {
          rotate: "radial",
          align: "right",
          colour: "auto"
        },
        itemStyle: {
          color: {
            type: "radial",
            x: 0.5,
            y: 0.5,
            r: 0.5,
            colorStops: [
              { offset: 0, color: "orange" },
              { offset: 1, color: "red" }
            ],
            global: false
          }
        }
      }
    ]
  };
}
