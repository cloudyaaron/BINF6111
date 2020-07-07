import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './input.component.html',
  styleUrls: [ './bootstrap.min.css' ]
})
export class InputComponent {
  title = 'Input File Page';
  file: File | null;

  constructor(private router:Router){}

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
      reader.readAsArrayBuffer(this.file);
    }
  }
}