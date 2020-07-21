import { Component, Input } from "@angular/core";
import data from "./phenotips_2020-06-09_18-16_with_external_id.json";
import { ApiService } from "./HPOapi/api.service";
import { HashTable } from "./classes/hashtable";
import { MatChipsModule, MatChipInputEvent } from "@angular/material/chips";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import {MatTabsModule} from '@angular/material/tabs';
import {MatSidenavModule} from '@angular/material/sidenav';

//https://bootswatch.com/litera/?

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./bootstrap.min.css"]
})
export class AppComponent {
  name = "Angular ";
  hpoTerms: HashTable<string, any>;
  hpoList = data[0];
  patients = data;
  values = "";
  suggest_text = "";
  search_result = [];
  patientsLenth = Object.keys(this.patients).length;
  suggested_queries = [];
  showConfig = true;
  typeR = "R";
  intersection_check = false;

  //multiple seaching function + ui
  removable = true;
  readonly separatorKeysCodes: number[] = [ENTER];
  search_list = [];

  constructor(private apiService: ApiService) {}

  add(event: MatChipInputEvent): void {
    this.search_result = [];
    const input = event.input;
    const value = event.value;

    // Add label
    if ((value || "").trim()) {
      this.AddtoSearch(value)
    }
    // Reset the input value
    if (input) {
      input.value = "";
    }
    this.refreshPage();
  }

  AddtoSearch(t:string):void{
    t = t.trim()
    this.search_list.push({ detail: t.trim() });
    this.search_result.push({ query: t.trim(), answer: [] });
  }
  refreshPage() {
    this.values = "";
    this.search_result = [];
    this.suggested_queries = [];

    console.log("search_list",this.search_list);
    console.log("resultlust",this.search_result);
    if (this.search_list.length != 0) {
      for (var search_term of this.search_list) {
        this.search_result.push({ query: search_term["detail"], answer: [] });
        this.search(search_term["detail"]);
      }
    } else if (this.search_list.length == 0) {
      this.search_result = [];
    }
    if (this.search_list.length != 0 && this.search_result.length == 0) {
      if (search_term["detail"][0] == "P") {
        console.log(search_term["detail"].length);
        //Extract the number from the search and try to find any patients with the number
        var key_chars = search_term["detail"].split("0");
        var len_kc = 0;
        console.log("printing key chars");

        var suggest_regex = ".*";
        for (let k = 0; k < key_chars.length; k++) {
          if (key_chars[k] == "P") {
            continue;
          } else {
            suggest_regex = suggest_regex.concat(key_chars[k]);
            suggest_regex = suggest_regex.concat(".*");
          }
        }
        console.log(suggest_regex);
        let sugReg = new RegExp(suggest_regex);
        var suggestion_array = [];
        var suggest_count = 0;
        for (let i = 0; i < this.patientsLenth; i++) {
          if (suggest_count == 5) {
            break;
          }
          if (sugReg.test(this.patients[i]["report_id"])) {
            console.log(this.patients[i]["report_id"]);
            suggestion_array.push(this.patients[i]["report_id"]);
            suggest_count += 1;
          }
        }
        this.suggested_queries = suggestion_array;

        if (search_term["detail"].length == 8) {
          for (let i = 0; i < this.patientsLenth; i++) {
            //console.log(this.patients[i]['report_id'])
          }
        } else {
          this.values =
            "Input length too short. Correct input of format PXXXXXXX";
        }
      } else if (search_term["detail"].slice(0, 3) == "HP:") {
        var key_chars = search_term["detail"].split("0");
        var len_kc = 0;
        console.log("printing key chars");

        var suggest_regex = ".*";
        for (let k = 0; k < key_chars.length; k++) {
          if (key_chars[k] == "HP:") {
            continue;
          } else {
            suggest_regex = suggest_regex.concat(key_chars[k]);
            suggest_regex = suggest_regex.concat(".*");
          }
        }
        console.log(suggest_regex);
        let sugReg = new RegExp(suggest_regex);
        var suggestion_array = [];
        var suggest_count = 0;
        for (let i = 0; i < this.patientsLenth; i++) {
          var pp = this.patients[i]["features"];
          for (var phenotype of pp) {
            if (suggest_count == 5) {
              break;
            }
            if (sugReg.test(phenotype["id"])) {
              console.log(phenotype["id"]);
              suggestion_array.push(phenotype["id"]);
              suggest_count += 1;
            }
          }
        }
        this.suggested_queries = suggestion_array;

        for (let i = 0; i < this.patientsLenth; i++) {
          var pp = this.patients[i]["features"];
          for (var phenotype of pp) {
            //console.log(phenotype['id'])
          }
        }
      } else {
        this.values = "Sorry but nothing has been found";
      }
    }
  }

  search(search_term: string): any {
    console.log("search");
    var index = 0;
    for (index; index < this.search_result.length; index++) {
      if (search_term == this.search_result[index]["query"]) {
        console.log(index);
        break;
      }
    }
    if (search_term[0] == "P") {
      for (let i = 0; i < this.patientsLenth; i++) {
        if (this.patients[i]["report_id"] == search_term) {
          console.log(this.patients[i]["report_id"]);
          this.search_result[index]["answer"].push(this.patients[i]);
          console.log(this.search_result[index]["answer"]);
          break;
        }
      }
    } else if (search_term.slice(0, 3) == "HP:") {
      console.log("searching for a hpo term");
      //tried to get the searching terms
      //this.apiService.storeConfig(search_term['detail'])
      for (let i = 0; i < this.patientsLenth; i++) {
        var pp = this.patients[i]["features"];
        for (var phenotype of pp) {
          if (
            phenotype["id"] == search_term &&
            phenotype["observed"] == "yes"
          ) {
            //if(this.check_result(this.patients[i])== true){
            this.search_result[index]["answer"].push(this.patients[i]);

            //}
            break;
          }
        }
      }
      //if(search_term['detail'].length==10 &&            this.search_result.length==0){
      if (search_term.length == 10 && this.search_result.length == 0) {
        this.search_result = [];
      }
      if (search_term.length >= 11) {
        this.values = "HPO term format incorrect";
        this.search_list.pop();
      }
    }
  }

  getResultNum() {
    var r = 0;
    if (this.search_result.length == 0) {
      return 0;
    }
    for (var search_term of this.search_result) {
      r = search_term["answer"].length + r;
    }
    return r;
  }

  //return false when already have patient
  check_result(p: any, plist: Array<any>): Boolean {
    if (plist.length == 0) {
      return true;
    }
    for (var term of plist) {
      if (p["report_id"] == term["report_id"]) {
        return false;
      }
    }
    return true;
  }

  remove(term: any): void {
    console.log("removing" + term);
    const index = this.search_list.indexOf(term);
    if (index >= 0) {
      this.search_list.splice(index, 1);
    }
    this.refreshPage();
  }

  onIntersection(toggle: Event) {
    let easyexit = 0;
    if (this.intersection_check == false) {
      this.refreshPage();
      return;
    }
    if (this.getResultNum() == 0 || this.search_result.length == 0) {
      this.values = "can not find intersection";
      //toggle.
      this.intersection_check = false;
    } else {
      var search = "Combined of";
      var target = this.search_result;
      this.search_result = [];
      var temp = [];
      for (var term of target) {
        search = search + " , " + term["query"];

        if (term["answer"].length == 0) {
          easyexit = 1;
        }
        for (var a of term["answer"]) {
          temp.push(a);
        }
      }
      this.search_result.push({ query: search.trim(), answer: [] });
      if (easyexit == 1) {
        console.log("easyexit");
        return;
      }

      console.log(temp);
      let threshold = this.search_list.length;
      for (var term of temp) {
        let n = 0;
        for (var t of temp) {
          if (t["report_id"] == term["report_id"]) {
            n = n + 1;
          }
        }
        if (
          n >= threshold &&
          this.check_result(term, this.search_result[0]["answer"]) == true
        ) {
          this.search_result[0]["answer"].push(term);
        }
      }
    }
  }

  //single searching function will be integret into multiple seaching function
  // suggest from here!!!
  onKeyUp(event: any) {
    var user_input = event.target.value.trim();
    console.log(user_input);
    if (user_input[0] == "P") {
      this.suggest_text = "Currently search patients id";
      if (user_input.length >= 2) {
        var w_card = ".*";
        var regex = user_input.concat(w_card);
        var patient_regex = new RegExp(regex);
        var suggestion_array = [];
        var add_suggestion = 0;
        for (let i = 0; i < this.patientsLenth; i++) {
          //console.log(this.patients[i]['report_id'])
          if (add_suggestion == 5) {
            break;
          }
          if (patient_regex.test(this.patients[i]["report_id"])) {
            add_suggestion += 1;
            //console.log('worked')
            suggestion_array.push(this.patients[i]["report_id"]);
          }
        }
        console.log(suggestion_array);
        this.suggested_queries = suggestion_array;
        /*
        for (let i=0; i<suggestion_array.length;i++)
        {
          this.suggested_queries[i] = suggestion_array[i].concat('<br />');
        }
        */
      }
    } else if (user_input.slice(0, 3) == "HP:") {
      this.suggest_text = "Currently search HPO terms";
      if (user_input.length >= 2) {
        var w_card = ".*";
        var regex = user_input.concat(w_card);
        var hpo_regex = new RegExp(regex);
        var suggestion_array = [];
        var add_suggestion = 0;
        for (let i = 0; i < this.patientsLenth; i++) {
          //console.log(this.patients[i]['report_id'])

          var pp = this.patients[i]["features"];
          for (var phenotype of pp) {
            //if(phenotype['id'] == search_term['detail']){
            if (add_suggestion == 5) {
              break;
            }
            if (hpo_regex.test(phenotype["id"])) {
              if (suggestion_array.lastIndexOf(phenotype["id"]) >= 0) {
                continue;
              }
              add_suggestion += 1;
              //console.log('worked')
              suggestion_array.push(phenotype);
            }
          }
          if (add_suggestion == 5) {
            break;
          }
        }
        //console.log(suggestion_array)
        this.suggested_queries = suggestion_array;
        /*
        for (let i=0; i<suggestion_array.length;i++)
        {
          this.suggested_queries[i] = suggestion_array[i].concat('<br />');
        }
        */
      }
    } else if (user_input.length == 0) {
      this.suggest_text = "";
    } else {

      let temp = [];
      this.apiService.natureSearch(user_input).subscribe(data => {
        //let detail = {}
        this.suggested_queries=[]

        //this.result_object = new HPOTerm()
        temp = data["terms"];
        console.log(temp);
        for (var t of temp){
          this.suggested_queries.push({id:t['ontologyId'],label:t['name']})
        }
      });
      this.suggest_text = "Nature language searching?";
    }
  }

  addExtra(term){
    
    this.AddtoSearch(term)
    this.refreshPage()
  }

  public clickSuggestButton(event: any) {
    console.log(event)
    //var st['detail'] = this.suggested_queries[0]
    //event["detail"] = event
    this.AddtoSearch(event['id']);

    this.refreshPage();
  }


      toggleConfig() { this.showConfig = !this.showConfig; }

  //Useful urls: https://www.freakyjolly.com/angular-e-charts-using-ngx-echarts-tutorial/#.XvFQAGgzY2w
  //https://www.npmjs.com/package/ngx-echarts
}
