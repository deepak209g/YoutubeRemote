import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Input, OnChanges, SimpleChanges } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavParams } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';


@Component({
  selector: 'page-control',
  templateUrl: 'control.html'
})
export class ControlPage implements OnChanges {
  public volume = 30;
  public playicon = 'play';
  private playing = false;
  private myip = null;
  @Input() private current_song;
  private buttontext = 'Add to Library'
  constructor(public navCtrl: NavController, private http: Http, private storage: Storage, private navParams: NavParams, private global: GlobalProvider) {
    // storage.get('currentip').then((val) => {
    //   // console.log('Your age is', val);
    //   // this.myip = val;

    // });
    this.myip = this.global.myip
    // this.myip = navParams.get('currentip')
    this.current_song = this.global.current_song;
    this.playicon = this.global.playicon;
    this.playing = this.global.playing;
    this.updateButtonText();

  }

  notifyVolumeChange() {
    console.log(this.volume);
    this.changeVolume(this.volume)
  }

  playPause() {
    console.log('play pause')
    console.log(this.myip)
    if (this.playing == false) {
      // not playing
      this.http.get('http://' + this.myip + '/play')
        .subscribe(data => { })

      this.global.play(this)
    } else {
      this.http.get('http://' + this.myip + '/pause')
        .subscribe(data => { })
      this.global.pause(this)
    }
  }

  playNext() {
    this.http.get('http://' + this.myip + '/next')
      .subscribe(data => { })
  }

  playPrev() {
    this.http.get('http://' + this.myip + '/prev')
      .subscribe(data => { })
  }


  changeVolume(vol) {
    this.http.get('http://' + this.myip + '/volume?' + vol)
      .subscribe(data => { })
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    // console.log(changes.volume)
    console.log(changes)
  }

  addRemoveSong() {
    if (this.global.song_index(this.current_song) >= 0) {
      // song is in the library
      // so the user wants to remove song
      this.global.remove_song_from_library(this.current_song)
    } else {
      this.global.add_song_to_library(this.current_song)
    }

    this.updateButtonText()
  }

  updateButtonText() {
    console.log(this.current_song)
    console.log(this.global.mysongs)
    console.log(this.global.song_index(this.current_song))
    if (this.global.song_index(this.current_song) >= 0) {
      // current song in library
      this.buttontext = 'Remove Song'
    } else {
      this.buttontext = 'Add Song'
    }
  }

  ionViewWillEnter() {
    console.log('will enter')
    this.updateButtonText()

    this.playicon = this.global.playicon;
    this.playing = this.global.playing;
    this.myip = this.global.myip

    this.http.get('http://' + this.myip + '/get_current_song')
      .subscribe(data => {
        let mydata = data.json()
        // console.log(mydata.length)
        console.log(mydata)
        this.global.update({ current_song: mydata });
        this.updateButtonText()
      }, err => {
        console.log("Oops!");
        // this.showAlert(err)
      })

  }
}
