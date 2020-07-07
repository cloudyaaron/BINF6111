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

  public onSubmit(): void {
    console.group( "Form View-Model" );
    console.log('submitted2');
    console.log(this.file);
    console.groupEnd();

    let reader = new FileReader();
    reader.readAsArrayBuffer(this.file);
  }
}