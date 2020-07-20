import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from './data.service';
import * as XLSX from 'xlsx';

//const { read, write, utils } = XLSX;
type AOA = any[][];

@Component({
  selector: 'my-app',
  templateUrl: './input.component.html',
  styleUrls: [ './bootstrap.min.css' ]
})
export class InputComponent {
  title = 'Input File Page';
  file: File | null;
  data: Array<any> = [];
  res: AOA;
  datalength = 0;

  constructor(private router:Router, private route:ActivatedRoute, private dataService: DataService){}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.file = params['file'];
    });
  }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  onSubmit(): void {
    console.group( "Form View-Model" );
    console.log(this.file);
    console.groupEnd();

    console.log(this.file.type);
    if (this.file == null) {
      console.log('No file was selected')
    } else if (this.file.type == "application/json") {
      let reader = new FileReader();
      reader.readAsText(this.file);
      
      reader.onload = (e) => {
        this.data = JSON.parse(reader.result as string);
        this.datalength = Object.keys(this.data).length;
        this.dataService.setData(this.data);
      }
      //console.log(this.dataService.getData());
    } else if (this.file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || this.file.type == "application/vnd.ms-excel") {
      let reader = new FileReader();
      
      reader.onload = (e) => {
        let bstr: string = e.target.result as string;
        let wb = XLSX.read(bstr, { type: 'binary' });
        let wsname: string = wb.SheetNames[0];
        let ws: XLSX.WorkSheet = wb.Sheets[wsname];
        this.res = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));

        let report_id;
        let sex;
        let features_id;
        let features_label;
        //let features_type;
        let features_observed;
        let nonstandard_features_label;
        let nonstandard_features_observed;

        for (let i=0; i<this.res[0].length; i++) {
          if (this.res[0][i] == "report_id") 
            report_id = i;
          else if (this.res[0][i] == "sex") 
            sex = i;
          else if (this.res[0][i] == "features_id") 
            features_id = i;
          else if (this.res[0][i] == "features_observed") 
            features_observed = i;
          else if (this.res[0][i] == "features_label") 
            features_label = i;
          else if (this.res[0][i] == "nonstandard_features_label")
            nonstandard_features_label = i;
          else if (this.res[0][i] == "nonstandard_features_observed")
            nonstandard_features_observed = i;
        }

        let patient = [];
        // get patient rows numbers
        for (let i=1; i<this.res.length; i++) 
          if (this.res[i][report_id]) patient.push(i);
        
        let result: string = "[";
        for (let i=0; i<patient.length; i++) {
          result = result + '{"report_id":"' + this.res[patient[i]][report_id] + '","sex":"' + this.res[patient[i]][sex] + '","features":[';
          let nonstandard = '"nonstandard_features":[';
          for (let j=patient[i]; j<patient[i+1]; j++) {
            //Get HPO features
            if (this.res[j][features_id]) result = result + '{"id":"' + this.res[j][features_id] + '"';
            if (this.res[j][features_label]) result = result + ',"label":"' + this.res[j][features_label] + '"';
            if (this.res[j][features_observed] && this.res[j+1][features_observed] && j+1 != patient[i+1]) result = result + ',"observed":"' + this.res[j][features_observed] + '"},';
            else if(this.res[j][features_observed]) result = result + ',"observed":"' + this.res[j][features_observed] + '"}';
            //Get nonstandard_features
            if (this.res[j][nonstandard_features_label]) nonstandard = nonstandard + '{"label":"' + this.res[j][nonstandard_features_label] + '"'; 
            if (this.res[j][nonstandard_features_observed] && this.res[j+1][nonstandard_features_observed] && j+1 != patient[i+1]) nonstandard = nonstandard + ',"observed":"' + this.res[j][nonstandard_features_observed] + '"},'; 
            else if (this.res[j][nonstandard_features_observed]) nonstandard = nonstandard + ',"observed":"' + this.res[j][nonstandard_features_observed] + '"}'; 
          }
          result = result + '],';
          nonstandard = nonstandard + ']'
          if (patient[i+1]) result = result + nonstandard + '},'; 
          else result = result + nonstandard + '}]';
        }
        //console.log(result);
        this.data = JSON.parse(result);
        this.datalength = Object.keys(this.data).length;
        this.dataService.setData(this.data);
      };
      reader.readAsBinaryString(this.file);
      //reader.readAsArrayBuffer(this.file);
      //console.log(this.dataService.getData());
    }

    this.router.navigate(['/app'])
  }
}