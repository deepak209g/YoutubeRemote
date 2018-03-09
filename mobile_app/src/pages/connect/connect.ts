import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { ControlPage } from '../control/control';
import { AlertController } from 'ionic-angular';
import {GlobalProvider} from '../../providers/global/global'
import { SongsPage } from '../songs/songs';

@Component({
  selector: 'page-connect',
  templateUrl: 'connect.html'
})
export class ConnectPage {
  public myip
  constructor(public navCtrl: NavController, private http: Http, private storage: Storage, public alertCtrl: AlertController, private global: GlobalProvider) {
    this.myip = '';
    this.global.myip = this.myip;
  }

  connectToIP() {

    this.http.get('http://' + this.myip + '/ping')
      .subscribe(data => {
        data = data.json()
        console.log(data);
        // console.log(data.data); // data received by server
        // console.log(data.headers);
        // alert(data)

        // this.showAlert(data)
        if(data['available'] == true){
          // this.storage.set('currentip', this.myip);
          this.global.myip = this.myip
          // this.navCtrl.push(SongsPage, {
          //     id: "123",
          //     name: "Carl",
          //     currentip: this.myip
          // });
          this.navCtrl.parent.select(3)
        }

      }, err => {
        console.log("Oops!");
        this.showAlert(err)
    })
  }

  showAlert(data) {
    let alert = this.alertCtrl.create({
      title: 'Alert!',
      subTitle: data,
      buttons: ['OK']
    });
    alert.present();
  }

}
