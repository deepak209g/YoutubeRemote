import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { GlobalProvider } from '../../providers/global/global'

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  public searchquery = ''
  public results = [];
  private myip = ''
  constructor(public navCtrl: NavController, private http: Http, private global: GlobalProvider) {
    // storage.get('currentip').then((val) => {
    //   this.myip = val;
    // });
    this.myip = this.global.myip;
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
        // console.log(mydata.length)
        console.log(mydata)
        this.results = mydata
      }, err => {
        console.log("Oops!");
        // this.showAlert(err)
      })
  }
  itemSelected(item) {
    console.log(item)
    this.http.get('http://' + this.myip + '/goto_song?' + item.url)
      .subscribe(data => {
        this.global.update({ current_song: item });
        this.global.play(null)
      }, err => {
        console.log("Oops!");
        // this.showAlert(err)
      })
  }


  ionViewWillEnter(){
    console.log('will enter')
   this.myip = this.global.myip;
    
  }
}
