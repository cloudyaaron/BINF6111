import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from './data.service';
import * as XLSX from 'xlsx';

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
  excelRes: AOA;
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
    console.log('submitted');
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
        console.log(this.data);
        //console.log(this.dataService.getData());
      }
      console.log(this.dataService.getData());
    } else if (this.file.type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || this.file.type == "application/vnd.ms-excel") {
      let reader = new FileReader();
      reader.readAsText(this.file);

      reader.onload = (e) => {
        // this.data = JSON.parse('[{"features":[{"id":"HP:0002725","label":"Systemic lupus erythematosus","type":"phenotype","observed":"yes"}],"report_id":"P0000038","sex":"M","nonstandard_features":[],"external_id":"17F00037; 40421494","clinicalStatus":"affected"}, {"features": [],"report_id": "P0000112","sex": "F","nonstandard_features": [],"external_id": "C20MW112, 17F00040, 40421736","clinicalStatus": "affected"}]');
        // this.datalength = Object.keys(this.data).length;
        // this.dataService.setData(this.data);
        // console.log(this.data);
        // console.log(this.data.length);

        let bstr: string = e.target.result as string;
        let wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        let wsname: string = wb.SheetNames[0];
        let ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.excelRes = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        //console.log(this.excelRes);

        let report_id;
        let sex;
        let features_id;
        let features_label;
        //let features_type;
        let features_observed;
        let nonstandard_features_label;
        let nonstandard_features_observed;

        for (let i=0; i<this.excelRes[0].length; i++) {
          if (this.excelRes[0][i] == "report_id") 
            report_id = i;
          else if (this.excelRes[0][i] == "sex") 
            sex = i;
          else if (this.excelRes[0][i] == "features_id") 
            features_id = i;
          else if (this.excelRes[0][i] == "features_observed") 
            features_observed = i;
          else if (this.excelRes[0][i] == "features_label") 
            features_label = i;
          else if (this.excelRes[0][i] == "nonstandard_features_label")
            nonstandard_features_label = i;
          else if (this.excelRes[0][i] == "nonstandard_features_observed")
            nonstandard_features_observed = i;
        }

        // get patient rows numbers
        for (let i=0; i<this.excelRes.length; i++) {
          if (this.excelRes[i][report_id]) {
            console.log("patient: ", i, this.excelRes[i][report_id]);
          }
        }

        let result: string = "";

      }
      //console.log(this.dataService.getData());
    }

    this.router.navigate(['/app'])
  }
}