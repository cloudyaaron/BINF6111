import { Component, Input, Output, EventEmitter, Inject } from "@angular/core";
import { ApiService } from "./api.service";
import { MessageService } from "../message.service";
import { HPOTerm, Details, Relations, RelationTerm } from "../classes/HPOTerm";
import { MatListModule } from "@angular/material/list";

import { ModalService } from '../modal';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA,MatDialogModule} from '@angular/material/dialog';

import {CommonModule} from '@angular/common';


@Component({
  selector: "HPOapi",
  templateUrl: "./api.component.html",
  providers: [ApiService],
  styleUrls: ["../lumen.css"]
})

export class ApiComponent {
  @Input("input") input_term: string[];
  @Output() extra = new EventEmitter<any>();
  error: any;

  //result of hpo term details
  althpoid: string[];
  name: string;
  definition: string;
  firstLevelChildren: [];
  result_list: any[];
  resultObject: any;


  //result of hpo term associations
  assogenes: []
  assoMapTerms: []

  dbDisease: []

  //result of query search
  term_result: any[];
  gene_result: any[];
  disease_result: any[];

  //result of gene search
  assoterms: any;

  //result of disease search
  catLabels: string[];
  diseaseObject:any 

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

  modalId: 0; 

  isAssoGene = false
  showAssoGene = true
  isAssoDisease = false
  showAssoDisease = true
  
  showContent = true
  showMapTerms = false
  constructor(private apiService: ApiService, private modalService: ModalService, public dialog: MatDialog) {}

  openDialog(result:any): void {
    const dialogRef = this.dialog.open(Modal, {
      width: '1000px',
      data: result
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  //modal
  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }
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
  
  assoGeneSearch(term:string) {
    this.apiService.assoGeneSearch(term).subscribe(data => {
      this.resultObject = data
    })
    this.isAssoGene = !this.isAssoGene;
  }
  
  assoDiseaseSearch(term:string) {
    this.apiService.assoDiseaseSearch(term).subscribe(data => {
      this.resultObject = data
    })
    this.isAssoDisease = !this.isAssoDisease;
  }

  findTermMap(term:string) {
    for (var t of this.resultObject["catTermsMap"]) {      
      if (t['catLabel'] == term) {
        this.assoMapTerms = t['terms']
      }
    }
  }

  finddbDisease(term:string) {
    for (var t of this.resultObject["genes"]) {    
      if (t['entrezGeneId'] == term) {
        console.log(t)
        this.dbDisease = t
      }
    }
    this.openDialog(this.dbDisease)
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

  generateModalId() {
    this.modalId += 1
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

}

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'modal.html',
})
export class Modal {

  constructor(
    public dialogRef: MatDialogRef<Modal>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}