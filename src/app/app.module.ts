import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgBusyModule } from 'ng-busy';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTree, MatTreeModule } from '@angular/material/tree';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { ApiComponent }      from './HPOapi/api.component';
import { ApiService } from './HPOapi/api.service';

import { MessageService }       from './message.service';
import {HPOTerm, Details, Relations, RelationTerm} from './classes/HPOTerm';

@NgModule({
  imports:      [ BrowserModule, FormsModule,NgBusyModule ,MatProgressSpinnerModule, MatTreeModule, MatChipsModule, MatFormFieldModule,BrowserAnimationsModule, HttpClientModule],
  declarations: [ AppComponent, HelloComponent],
  bootstrap:    [ AppComponent ],
  providers:    [MessageService, ApiService]
})
export class AppModule { }
