import { Component, Input} from '@angular/core';
import data from './phenotips_2020-06-09_18-16_with_external_id.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular ' ;
  title = 'BINF6111 HPO FILTER'
  hpoList = data;
  values = ''
  onClickSearch(){
    alert("not implemented");
  }

  onKeyUp(event:any){
    this.values = event.target.value;
  }
}
