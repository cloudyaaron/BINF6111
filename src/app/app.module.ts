import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { InputComponent } from './input.component';
import { AppComponent } from './app.component';
import { MainComponent } from './main.component';
import { AboutComponent } from './About/about.component';
import { DataService } from './data.service';

import { AppRoutingModule } from './app-routing.module'
import { HelloComponent } from "./hello.component";
import { ModalModule } from './modal';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTree, MatTreeModule } from "@angular/material/tree";
import { MatChipsModule } from "@angular/material/chips";
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";

import { ApiComponent } from "./HPOapi/api.component";
import { ApiService } from "./HPOapi/api.service";
import { SearchService } from "./search.service";

import { PatientsList } from "./PatientsList/patients.component";

import { graphComponent } from "./Charts/graph.component";

import { MessageService } from "./message.service";
import { HPOTerm, Details, Relations, RelationTerm } from "./classes/HPOTerm";

import { NgxEchartsModule } from "ngx-echarts";

import * as echarts from "echarts";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSelectModule } from "@angular/material/select";
import { MatListModule } from "@angular/material/list";
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatTreeModule,
    MatChipsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({ echarts }),
    MatTabsModule,
    MatSidenavModule,
    MatSelectModule,
    MatListModule,
    MatCheckboxModule
    AppRoutingModule,
    ModalModule
    
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ApiComponent,
    PatientsList,
    graphComponent,
    InputComponent,
    MainComponent,
    AboutComponent
  ],
  bootstrap: [MainComponent],
  providers: [MessageService, ApiService, SearchService, DataService]
})
export class AppModule {}
