
import { Component, Input } from '@angular/core';
import { ApiService } from './api.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'HPOapi',
  templateUrl: './api.component.html',
  providers: [ ApiService ],
  styles: ['.error {color: red;}']
})

export class ApiComponent {
  @Input('search_result') search_result: string[];
  error: any;
  headers: string[];
  hpoid: string;
  name: string; 
  
  constructor(private apiService: ApiService) {}

  showConfig(term:string) {

    this.apiService.getConfig(this.search_result['details'])
      .subscribe(
        (data) => {
                    console.log('details', data['details']);
                    this.hpoid = data['detail']['id'];
                    this.name = data['detail']['name']}, 
               
      );
  }

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/