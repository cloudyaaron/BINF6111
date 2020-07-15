import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import * as XLSX from 'xlsx';

@Component({
  selector: 'my-app',
  templateUrl: './input.component.html',
  styleUrls: [ './bootstrap.min.css' ]
})
export class InputComponent {
  title = 'Input File Page';
  file: File | null;
  data: Array<any> = [];
  datalength = 0;

  constructor(private router:Router, private route:ActivatedRoute){}
  
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.file = params['file'];
    });
  }

  fileChanged(e) {
    this.file = e.target.files[0];
  }

  public onSubmit(): void {
    console.group( "Form View-Model" );
    console.log('submitted');
    console.log(this.file);
    console.groupEnd();

    console.log(this.file.type);
    if (this.file == null) {
      console.log('No file was selected')
    } else if (this.file.type == "application/json") {
      let reader = new FileReader();
      
      console.log(typeof reader.result);
      console.log('bye');
      reader.readAsText(this.file);
      reader.onload = (e) => {
        //console.log(reader.result);
        console.log(JSON.parse(reader.result as string));
        this.data = JSON.parse(reader.result as string);
        //console.log(Object.keys(this.data).length);
        console.log(this.data[28]);
        console.log(JSON.stringify(this.data));
        this.datalength = Object.keys(this.data).length;
      }
    } else if (this.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type == 'application/vnd.ms-excel') {
      console.log('excel file');
      //this.data = JSON.parse('{ "myString": "string", "myNumber": 4 }');
      this.data = JSON.parse('[{"features":[{"id":"HP:0002725","label":"Systemic lupus erythematosus","type":"phenotype","observed":"yes"}],"report_id":"P0000038","sex":"M","nonstandard_features":[],"external_id":"17F00037; 40421494","clinicalStatus":"affected"}]');
      this.datalength = Object.keys(this.data).length;
    }

    //this.router.navigate(['main']);
  }
}