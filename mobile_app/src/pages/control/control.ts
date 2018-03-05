import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Input, OnChanges ,SimpleChanges } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavParams } from 'ionic-angular';


@Component({
  selector: 'page-control',
  templateUrl: 'control.html'
})
export class ControlPage implements OnChanges{  
  public volume = 30;
  public playicon = 'play';
  private playing = false;
  private myip = null;
  constructor(public navCtrl: NavController, private http: Http, private storage: Storage, private navParams: NavParams) {
    storage.get('currentip').then((val) => {
      // console.log('Your age is', val);
      // this.myip = val;

    });
    this.myip = navParams.get('currentip')
    
    
  }

  notifyVolumeChange(){
    console.log(this.volume);
    this.changeVolume(this.volume)
  }

  playPause(){
    console.log('play pause')
    console.log(this.myip)
    if (this.playing == false){
      // not playing
      this.http.get('http://' + this.myip + '/play')
      .subscribe(data => {})

      this.playing = !this.playing
      this.playicon = 'pause'
    }else{
      this.http.get('http://' + this.myip + '/pause')
      .subscribe(data => {})

      this.playing = !this.playing
      this.playicon = 'play'
    }
  }

  playNext(){
    this.http.get('http://' + this.myip + '/next')
      .subscribe(data => {})
  }


  changeVolume(vol){
    this.http.get('http://' + this.myip + '/volume?' + vol)
      .subscribe(data => {})
  }
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.log(changes.volume)
    console.log(changes)
  }
}
