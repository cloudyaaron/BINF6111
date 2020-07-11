import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { InputComponent } from './input.component';
import { AppComponent } from './app.component';

import { AppRoutingModule } from './app-routing.module'
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
import { SearchService } from './search.service';

import {PatientsList} from './PatientsList/patients.component';

import {graphComponent} from './Charts/graph.component'

import { MessageService }       from './message.service';
import {HPOTerm, Details, Relations, RelationTerm} from './classes/HPOTerm';

import { NgxEchartsModule } from 'ngx-echarts';
import * as echarts from 'echarts';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
  imports:      [ BrowserModule, FormsModule,NgBusyModule ,MatProgressSpinnerModule, MatTreeModule, MatChipsModule, MatFormFieldModule,BrowserAnimationsModule, HttpClientModule, AppRoutingModule, NgxEchartsModule.forRoot({echarts}),MatTabsModule,MatSidenavModule],
  declarations: [ AppComponent, HelloComponent,ApiComponent,PatientsList, InputComponent, graphComponent],
  bootstrap:    [ InputComponent ],
  providers:    [MessageService, ApiService, SearchService]
})
export class AppModule { }
