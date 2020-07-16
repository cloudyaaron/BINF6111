import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { HPOTerm, Details } from '../classes/HPOTerm'; 

@Injectable()
export class ApiService {
  baseUrl = 'https://hpo.jax.org/api/hpo/'; 
  termUrl = 'term/'
  searchUrl = '/search/?q='
  combinedUrl = '';  
  noResult = false; 

  details: Details; 
  constructor(private http: HttpClient) { }
  
  configUrl(term:string) {
    // given a specific option and get the specified urls
    if (this.isHPOTerm(term)) {
      this.combinedUrl = this.baseUrl + this.termUrl; 
    } else {
        this.combinedUrl = this.baseUrl + this.searchUrl;
    }

  }
  getConfig(term:string) {
    this.configUrl(term);
    let searchUrl = this.combinedUrl + term;
    console.log(searchUrl);
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

}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/