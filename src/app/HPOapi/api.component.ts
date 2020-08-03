import { Component, Input, Output, EventEmitter } from "@angular/core";
import { ApiService } from "./api.service";
import { MessageService } from "../message.service";
import { HPOTerm, Details, Relations, RelationTerm } from "../classes/HPOTerm";
import { MatListModule } from "@angular/material/list";

@Component({
  selector: "HPOapi",
  templateUrl: "./api.component.html",
  providers: [ApiService],
  styleUrls: ["../lumen.css"]
})
export class ApiComponent {
  @Input("input") input_term: string[];
  @Output() extra = new EventEmitter<any>();
  @Output() result = new EventEmitter<any>();
  error: any;

  //result of hpo term details
  resultObject: any;
  althpoid: string[];
  name: string;
  definition: string;
  firstLevelChildren: [];

  //result of hpo term associations


  //result of query search
  term_result: any[];
  gene_result: any[];
  disease_result: any[];

  //result of gene search
  assoterms: any;

  //result of disease search
  catLabels: string[];

  //toggles
  haveChildren = true;
  showChildren = true;

  toggle = true;
  toggleTerm = true;
  noResult = false;
  isNaturalLanguage = false;
  isDisease = false;
  isTerm = false;
  isGene = false;
  showAssoTerms = false;
  showAssoChildren = false;

  constructor(private apiService: ApiService) {}

  showHPOTermConfig(term: string) {
    this.apiService.getConfig(term).subscribe(data => {
      this.resultObject = data;
      this.extractDetailObject();
    });
  }

  showQueryConfig(term: string) {
    this.apiService.natureSearch(term).subscribe(data => {
      this.resultObject = data;
      this.term_result = data["terms"];
    });
  }

  showDiseaseConfig(term: string) {
    this.apiService.diseaseSearch(term).subscribe(data => {
      this.resultObject = data;
      this.catLabels = data["catTermsMap"]["catLabel"];
    });
  }

  showGeneConfig(term: string) {
    this.apiService.geneSearch(term).subscribe(data => {
      this.resultObject = data;
      this.assoterms = data["termAssoc"];
    });
  }

  AddToSearch(term) {
    this.extra.emit(term);
  }

  extractDetailObject() {
    this.althpoid = this.resultObject["details"]["altTermIds"];
    //if there is no children
    if (this.resultObject["relations"]["children"].length == 0) {
      this.toggleChildren();
    }
    this.firstLevelChildren = this.resultObject["relations"]["children"];
    this.name = this.resultObject["details"]["name"];
    this.definition = this.resultObject["details"]["definition"];
  }

  extractInput() {
    if (this.input_term) {
      let input_detail = this.input_term["detail"];
      if (this.apiService.isHPOTerm(input_detail)) {
        this.showHPOTermConfig(input_detail);
        this.toggleLoad();
        this.toggleIsTerm();
      } else if (this.apiService.isPatient(input_detail)) {
        console.log("patient case; ignore");
        this.toggleTermType();
        return;
      } else if (this.apiService.isDisease(input_detail)) {
        console.log("disease type");
        this.showDiseaseConfig(input_detail);
        this.toggleLoad();
        this.toggleDisease();
      } else if (this.apiService.isGene(input_detail)) {
        console.log("gene type");
        this.showGeneConfig(input_detail);
        this.toggleLoad();
        this.toggleIsGene();
      } else {
        console.log("natural language case");
        this.showQueryConfig(input_detail);
        this.toggleLoad();
        this.toggleQuery();
        //this.printQueryResult();
      }
    } else {
      console.log("input term is null!");
      return;
    }
  }

  AddAll() {
    for (var term of this.firstLevelChildren) {
      this.AddToSearch(term["ontologyId"]);
    }
  }

  toggleLoad() {
    this.toggle = !this.toggle;
  }
  toggleChildren() {
    this.haveChildren = !this.haveChildren;
  }
  toggleTermType() {
    this.toggleTerm = !this.toggleTerm;
  }
  toggleQuery() {
    this.isNaturalLanguage = !this.isNaturalLanguage;
  }
  toggleDisease() {
    this.isDisease = !this.isDisease;
  }
  toggleIsTerm() {
    this.isTerm = !this.isTerm;
  }
  toggleIsGene() {
    this.isGene = !this.isGene;
  }
  toggleShowTerms() {
    this.showAssoTerms = !this.showAssoTerms;
  }
  toggleShowChildren() {
    this.showAssoChildren = !this.showAssoChildren;
  }
  /*
  checkIfResult() { 
    console.log(this.apiService.noResult)
    return this.apiService.noResult; 
  };
  */
}

//just comment for change
/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
