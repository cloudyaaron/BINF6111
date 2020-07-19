import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { DataService } from './data.service';
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
        this.data = JSON.parse('[{"features":[{"id":"HP:0002725","label":"Systemic lupus erythematosus","type":"phenotype","observed":"yes"}],"report_id":"P0000038","sex":"M","nonstandard_features":[],"external_id":"17F00037; 40421494","clinicalStatus":"affected"}, {"features": [],"report_id": "P0000112","sex": "F","nonstandard_features": [],"external_id": "C20MW112, 17F00040, 40421736","clinicalStatus": "affected"}]');
        this.datalength = Object.keys(this.data).length;
        this.dataService.setData(this.data);
        console.log(this.data);
        console.log(this.data.length);
      }
      console.log(this.dataService.getData());
    }

    this.router.navigate(['/app'])
  }
}