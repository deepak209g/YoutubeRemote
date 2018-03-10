// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {
  public myip: string;
  public mysongs = [];
  public current_song;
  public playing;
  public playicon = 'play';
  constructor(private storage: Storage) {
    let mip = document.location.href;
    if (mip.indexOf('http://') >= 0) {
      mip = mip.substring(7, mip.length - 1);
    }
    this.myip = mip;
    console.log(this.myip)
    console.log('Hello GlobalProvider Provider');
    this.current_song = {
      'thumbnail': '../../assets/imgs/music.png',
      'url': '',
      'title': 'Music'
    };
    // this.storage.set('mysongs', null)
    this.storage.get('mysongs').then((val) => {
      // console.log('Your age is', val);
      // this.myip = val;

      if (val != null) {
        console.log("val is " + val);
        // val = JSON.parse(val)
        console.log(val)
        val.forEach(element => {
          this.mysongs.push(element)
        });
      }
      

    });

    this.storage.get('current_song').then((val) => {
      // console.log('Your age is', val);
      // this.myip = val;
      if (val != null) {
        this.current_song = val;
      }
      console.log("val is " + val);

    });


  }

  play(self: any) {
    this.playing = true;
    this.playicon = 'pause'
    if (self != null) {
      self.playicon = this.playicon;
      self.playing = this.playing;
    }
  }

  pause(self: any) {
    this.playing = false;
    this.playicon = 'play'
    self.playicon = this.playicon;
    self.playing = this.playing;
  }

  update(obj, target?) {
    for (var prop in obj) {
      this.update_localstorage(prop, obj[prop])
      var val = obj[prop];
      if (typeof val == "object") // this also applies to arrays or null!
        this.update(obj[prop], this[prop]);
      else {
        if (target) {
          target[prop] = val;
        } else {
          this[prop] = val;
        }
      }
    }

    return obj;
  }

  update_localstorage(key, value){
    if(key == 'current_song'){
      // this.storage.set(key, value)
      // this.storage.set(key, null)
    }else if(key == 'mysongs'){
      this.storage.set(key, value)
    }
  }

  add_song_to_library(song){
    console.log('added songs to library')
    if(this.song_index(song) == -1){
      let newcopy = this.clone(song)
      this.mysongs.push(newcopy);
      this.storage.set('mysongs', this.mysongs)
      // get('mysongs')
      
    }
  }

  remove_song_from_library(song){
    let song_index = this.song_index(song)
    // console.log(song_index)
    if(song_index >= 0){
      this.mysongs.splice(song_index, 1);
      this.update_localstorage('mysongs', this.mysongs)
    }
  }

  public song_index(song) {
    var i;
    for (i = 0; i < this.mysongs.length; i++) {
        if (this.mysongs[i].url === song.url) {
            return i;
        }
    }
    return -1;
  }

  private clone = function(obj) {
    return JSON.parse(JSON.stringify(obj));
  };
  

}

