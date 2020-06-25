import { Component } from '@angular/core';
import { Config, ConfigService } from './config.service';
import { MessageService } from '../message.service';


@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  providers: [ ConfigService ],
  styles: ['.error {color: red;}']
})
export class ConfigComponent {
  error: any;
  headers: string[];
  config: Config;
  input_term: string; 

  constructor(private configService: ConfigService) {}

  clear() {
    this.config = undefined;
    this.error = undefined;
    this.headers = undefined;
    this.input_term = undefined; 
  }

  showConfig(term:string) {
    this.input_term = term; 
    this.configService.getConfig_1(this.input_term)
      .subscribe(
        (data: Config) => {this.config = { ...data },
                          console.log('data', data);}, // success path
                          error => this.error = error // error path
      );
  }


  showConfigResponse() {
    this.configService.getConfigResponse()
      // resp is of type `HttpResponse<Config>`
      .subscribe(resp => {
        // display its headers
        const keys = resp.headers.keys();
        this.headers = keys.map(key =>
          `${key}: ${resp.headers.get(key)}`);

        // access the body directly, which is typed as `Config`.
        this.config = { ... resp.body };
      });
  }
  makeError() {
    this.configService.makeIntentionalError().subscribe(null, error => this.error = error );
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/