import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public searchquery = ''
  public songs = [];
  private myip = ''
  constructor(public navCtrl: NavController, private http: Http, private storage: Storage) {
    storage.get('currentip').then((val) => {
      this.myip = val;
    });
  }

  fetchSearchResults() {
    let toks = this.searchquery.split(' ')
    toks = toks.filter(function (t) {
      if (t.length > 0) {
        return true
      }
    })
    let query = toks.join('+')
    this.http.get('http://' + this.myip + '/search?' + query)
      .subscribe(data => {
        let mydata = data.json()
        this.songs = mydata
      }, err => {
        console.log("Oops!");
        // this.showAlert(err)
      })
  }
  itemSelected(item) {
    console.log(item)
    this.http.get('http://' + this.myip + '/goto_song?' + item.url)
      .subscribe(data => {
        // let mydata = data.json()
        // this.songs = mydata
        console.log(data)
      }, err => {
        console.log("Oops!");
        // this.showAlert(err)
      })
  }
}
