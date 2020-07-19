import { Injectable } from '@angular/core';
import { Observable, Subject }    from 'rxjs';

@Injectable()
export class DataService{
    //data;
    data: Subject<any> = new Subject<any>();
    changeData: Observable<any> = this.data.asObservable();

    constructor() { }

    setData(val){
      //this.data= val;
      this.data.next(val);
    }
    getData(){
      return this.data;
    }
    // change(){
    // this.dataChange.next(this.data);
    //}
}