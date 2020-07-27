import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgBusyModule } from 'ng-busy';
import { ModalModule } from './modal';
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
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module'
import { InputComponent } from './input.component';
import { MainComponent } from './main.component';
import { DataService } from './data.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule,NgBusyModule ,MatProgressSpinnerModule, MatTreeModule, MatChipsModule, MatFormFieldModule,BrowserAnimationsModule, HttpClientModule, AppRoutingModule, NgxEchartsModule.forRoot({echarts}),MatTabsModule,MatSidenavModule, ModalModule],
  declarations: [ AppComponent, HelloComponent,ApiComponent,PatientsList, InputComponent, graphComponent, MainComponent],
  bootstrap:    [ MainComponent ],
  providers:    [MessageService, ApiService, SearchService, DataService]
})
export class AppModule { }
