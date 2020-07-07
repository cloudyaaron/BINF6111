import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './input.component.html',
  styleUrls: [ './bootstrap.min.css' ]
})
export class InputComponent {
  title = 'Input File Page';
  file: File | null;

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
    console.log('submitted2');
    console.log(this.file);
    console.groupEnd();

    this.router.navigate(['main']);
    if (this.file == null) {
      console.log('file null')
    } else {
      let reader = new FileReader();
      reader.onload = (e) => {
        console.log(reader.result);
      }
      reader.readAsText(this.file);
    }
  }
}