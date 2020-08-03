import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HPOTerm, Details } from '../classes/HPOTerm'; 

@Injectable()
export class ApiService {
  baseUrl = 'https://hpo.jax.org/api/hpo/term/'; 
  searchUrl = 'https://hpo.jax.org/api/hpo/search/?q='
  geneUrl = 'https://hpo.jax.org/api/hpo/gene/'
  diseaseUrl = 'https://hpo.jax.org/api/hpo/disease/'

  noResult = false; 

  details: Details; 
  constructor(private http: HttpClient) { }
  
  getConfig(term:string) {
    let searchUrl = this.baseUrl + term;
    console.log(searchUrl);
   return this.http.get(searchUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  // search via natural language; return lists of genes, diseases, or hpo terms. 
  natureSearch(term:string){
    let searchUrl = this.searchUrl + term;
   return this.http.get(searchUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //search via gene entriz id, return symbol and information of associated hpo terms
  geneSearch(term:string){
    let searchUrl = this.geneUrl + term;
   return this.http.get(searchUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //search via disease OMIM or ORPHA id, return disease information and associated mapped body parts & mapped hpo terms 
  diseaseSearch(term:string){
    let searchUrl = this.diseaseUrl + term;
   return this.http.get(searchUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //search via one hpo term and return associated list disease details and its associated gene id
  assoDiseaseSearch(term:string){
    let searchUrl = this.baseUrl + term + '/diseases';
   return this.http.get(searchUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  //search via one hpo term and return associated list gene details and its associated disease id 
  assoGeneSearch(term:string){
    let searchUrl = this.baseUrl + term + '/genes';
   return this.http.get(searchUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    
    if (error.status == 404) {
      console.log("reach here")
        this.noResult = true
    }
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'The Api could not approach to results; check the search query');
  };

  isHPOTerm(term:string):boolean {
    let hregex = new RegExp('^HP:[0-9]{7}$')
    console.log(hregex.test(term))
    return hregex.test(term); 
  }
  isPatient(term:string):boolean {
    let pregex = new RegExp('^P[0-9]{7}$')
        console.log(pregex.test(term))
    return pregex.test(term);
  }
  isDisease(term:string):boolean {
    let dregex1 = new RegExp('^ORPHA:')
    let dregex2 = new RegExp('^OMIM:')
    return dregex1.test(term)||dregex2.test(term)
  }
  isGene(term:string):boolean {
    let gregex1 = new RegExp('^[0-9]*$')

    return gregex1.test(term)
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/