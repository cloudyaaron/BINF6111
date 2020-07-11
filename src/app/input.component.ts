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
  patients: Array<Object> = [];
  name1: string = 'Kavitha';

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
    //} else if (files[0].type!=="zip") 
    } else if (this.file.type == "application/json") {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(reader.result);
      }
      console.log(typeof reader.result);
      console.log('bye');
      this.patients.push(reader.result);
      reader.readAsText(this.file);
    } else if (this.file.type == 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || this.file.type == 'application/vnd.ms-excel') {
      console.log('excel file')
    }

    this.router.navigate(['main']);
  }
}