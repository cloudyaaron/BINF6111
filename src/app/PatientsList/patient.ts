import { HPOTerm } from '../classes/HPOTerm';
import { Injectable } from '@angular/core';


@Injectable()
export class Patient {
  constructor(private info: Info) {}

  // Get patient by id
  getPatient(id) {
    if (this.info.id == id) 
      return this;
    //return `${this.description} car with ` +
      //`${this.engine.cylinders} cylinders and ${this.tires.make} tires.`;
  }
};

export interface Info {
  id:   string, 
  sex: string,
  clinicalStatus: string,
  external_id: string, 
  // a more efficient method
  // obsStandard: Standard[],   -- observed standard features
  // notObserved: Standard[],   -- combining these 2 will give all the features that this patient has been tested for
  standard: Object[],
  nonStandard: Object[] 
};

/*
export interface Standard {    // -- These are the HPO features
  id: string,
  label: string,
  type: string,
  observed: string,    // -- remove this for efficient method
  notes: string
};

export interface nonStandard {
  label: string,
  type: string,
  notes: string,
  categories: HPOTerm[]
}; 
*/




