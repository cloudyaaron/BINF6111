import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { NgBusyModule } from "ng-busy";
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
    NgBusyModule,
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
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    ApiComponent,
    PatientsList,
    graphComponent
  ],
  bootstrap: [AppComponent],
  providers: [MessageService, ApiService, SearchService]
})
export class AppModule {}
