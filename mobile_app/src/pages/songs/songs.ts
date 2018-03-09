import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-songs',
  templateUrl: 'songs.html'
})
export class SongsPage {
  public myip = ''
  public songs = []
  constructor(public navCtrl: NavController, private global: GlobalProvider,private storage: Storage, private http: Http) {
    this.myip = global.myip;
    this.songs = this.global.mysongs;
  }

  itemSelected(item) {
    console.log(item)
    this.http.get('http://' + this.myip + '/goto_song?' + item.url)
      .subscribe(data => {
        // let mydata = data.json()
        // this.songs = mydata
        console.log(data);
        this.global.update({ current_song: item });
        this.global.play(null)
        // this.global.playing = true;
        // this.global.mysongs.push(item);
      }, err => {
        console.log("Oops!");
        // this.showAlert(err)
      })
  }

  removeSong(item){
    this.global.remove_song_from_library(item);
  }

  ionViewWillEnter(){
    console.log('will enter')
    this.songs = this.global.mysongs;
    this.myip = this.global.myip
    
  }

  getItems(ev: any) {
    // Reset items back to all of the items
    this.songs = this.global.mysongs

    // set val to the value of the searchbar
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.songs = this.songs.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

}
