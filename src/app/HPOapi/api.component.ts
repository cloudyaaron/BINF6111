
import { Component } from '@angular/core';
import { Config, ApiService } from './api.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'HPOapi',
  templateUrl: './api.component.html',
  providers: [ ApiService ],
  styles: ['.error {color: red;}']
})
export class ApiComponent {
  error: any;
  headers: string[];
  result: Config;
  input_term: string; 

  constructor(private apiService: ApiService) {}

  showConfig(term:string) {
    this.input_term = term; 
    this.apiService.getConfig(this.input_term)
      .subscribe(
        (data: Config) => {this.result = { ...data },
                          console.log('data', data);}, // success path
                          error => this.error = error // error path
      );
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/