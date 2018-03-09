webpackJsonp([0],{

/***/ 113:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 113;

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TabsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__search_search__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__control_control__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__connect_connect__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__songs_songs__ = __webpack_require__(203);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var TabsPage = (function () {
    function TabsPage() {
        this.tab1Root = __WEBPACK_IMPORTED_MODULE_3__connect_connect__["a" /* ConnectPage */];
        this.tab2Root = __WEBPACK_IMPORTED_MODULE_1__search_search__["a" /* SearchPage */];
        this.tab3Root = __WEBPACK_IMPORTED_MODULE_2__control_control__["a" /* ControlPage */];
        this.tab4Root = __WEBPACK_IMPORTED_MODULE_4__songs_songs__["a" /* SongsPage */];
    }
    TabsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\tabs\tabs.html"*/'<ion-tabs>\n  <ion-tab [root]="tab1Root" tabTitle="Connect" tabIcon="wifi"></ion-tab>\n  <ion-tab [root]="tab2Root" tabTitle="Search" tabIcon="search"></ion-tab>\n  <ion-tab [root]="tab3Root" tabTitle="Control" tabIcon="game-controller-a"></ion-tab>\n  <ion-tab [root]="tab4Root" tabTitle="Songs" tabIcon="list"></ion-tab>\n</ion-tabs>\n'/*ion-inline-end:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\tabs\tabs.html"*/
        }),
        __metadata("design:paramtypes", [])
    ], TabsPage);
    return TabsPage;
}());

//# sourceMappingURL=tabs.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_global_global__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SearchPage = (function () {
    function SearchPage(navCtrl, http, global) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.global = global;
        this.searchquery = '';
        this.results = [];
        this.myip = '';
        // storage.get('currentip').then((val) => {
        //   this.myip = val;
        // });
        this.myip = this.global.myip;
    }
    SearchPage.prototype.fetchSearchResults = function () {
        var _this = this;
        var toks = this.searchquery.split(' ');
        toks = toks.filter(function (t) {
            if (t.length > 0) {
                return true;
            }
        });
        var query = toks.join('+');
        this.http.get('http://' + this.myip + '/search?' + query)
            .subscribe(function (data) {
            var mydata = data.json();
            // console.log(mydata.length)
            console.log(mydata);
            _this.results = mydata;
        }, function (err) {
            console.log("Oops!");
            // this.showAlert(err)
        });
    };
    SearchPage.prototype.itemSelected = function (item) {
        var _this = this;
        console.log(item);
        this.http.get('http://' + this.myip + '/goto_song?' + item.url)
            .subscribe(function (data) {
            _this.global.update({ current_song: item });
            _this.global.play(null);
        }, function (err) {
            console.log("Oops!");
            // this.showAlert(err)
        });
    };
    SearchPage.prototype.ionViewWillEnter = function () {
        console.log('will enter');
        this.myip = this.global.myip;
    };
    SearchPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-search',template:/*ion-inline-start:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\search\search.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Search\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-item>\n    <ion-input placeholder="Search" [(ngModel)]="searchquery" type="text"></ion-input>\n    <button ion-button item-right (click)="fetchSearchResults()">\n      <ion-icon name="search"></ion-icon>\n    </button>\n  </ion-item>\n\n  <ion-item-group ion-item *ngFor="let item of results">\n    <ion-item-divider color="light">{{item.service}}</ion-item-divider>\n    <ion-list>\n      <button ion-item *ngFor="let item of item.songs" (click)="itemSelected(item)">\n        <ion-avatar item-start>\n          <img src="{{ item.thumbnail }}">\n        </ion-avatar>\n        {{ item.title }}\n      </button>\n    </ion-list>\n  </ion-item-group>\n\n  \n</ion-content>'/*ion-inline-end:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\search\search.html"*/
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_http__["a" /* Http */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_global_global__["a" /* GlobalProvider */]) === "function" && _c || Object])
    ], SearchPage);
    return SearchPage;
    var _a, _b, _c;
}());

//# sourceMappingURL=search.js.map

/***/ }),

/***/ 201:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ControlPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var ControlPage = (function () {
    function ControlPage(navCtrl, http, storage, navParams, global) {
        // storage.get('currentip').then((val) => {
        //   // console.log('Your age is', val);
        //   // this.myip = val;
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.navParams = navParams;
        this.global = global;
        this.volume = 30;
        this.playicon = 'play';
        this.playing = false;
        this.myip = null;
        this.buttontext = 'Add to Library';
        // });
        this.myip = this.global.myip;
        // this.myip = navParams.get('currentip')
        this.current_song = this.global.current_song;
        this.playicon = this.global.playicon;
        this.playing = this.global.playing;
        this.updateButtonText();
    }
    ControlPage.prototype.notifyVolumeChange = function () {
        console.log(this.volume);
        this.changeVolume(this.volume);
    };
    ControlPage.prototype.playPause = function () {
        console.log('play pause');
        console.log(this.myip);
        if (this.playing == false) {
            // not playing
            this.http.get('http://' + this.myip + '/play')
                .subscribe(function (data) { });
            this.global.play(this);
        }
        else {
            this.http.get('http://' + this.myip + '/pause')
                .subscribe(function (data) { });
            this.global.pause(this);
        }
    };
    ControlPage.prototype.playNext = function () {
        this.http.get('http://' + this.myip + '/next')
            .subscribe(function (data) { });
    };
    ControlPage.prototype.playPrev = function () {
        this.http.get('http://' + this.myip + '/prev')
            .subscribe(function (data) { });
    };
    ControlPage.prototype.changeVolume = function (vol) {
        this.http.get('http://' + this.myip + '/volume?' + vol)
            .subscribe(function (data) { });
    };
    ControlPage.prototype.ngOnChanges = function (changes) {
        // changes.prop contains the old and the new value...
        // console.log(changes.volume)
        console.log(changes);
    };
    ControlPage.prototype.addRemoveSong = function () {
        if (this.global.song_index(this.current_song) >= 0) {
            // song is in the library
            // so the user wants to remove song
            this.global.remove_song_from_library(this.current_song);
        }
        else {
            this.global.add_song_to_library(this.current_song);
        }
        this.updateButtonText();
    };
    ControlPage.prototype.updateButtonText = function () {
        console.log(this.current_song);
        console.log(this.global.mysongs);
        console.log(this.global.song_index(this.current_song));
        if (this.global.song_index(this.current_song) >= 0) {
            // current song in library
            this.buttontext = 'Remove Song';
        }
        else {
            this.buttontext = 'Add Song';
        }
    };
    ControlPage.prototype.ionViewWillEnter = function () {
        console.log('will enter');
        this.updateButtonText();
        this.playicon = this.global.playicon;
        this.playing = this.global.playing;
        this.myip = this.global.myip;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], ControlPage.prototype, "current_song", void 0);
    ControlPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-control',template:/*ion-inline-start:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\control\control.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Player\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n\n<ion-content padding>\n  <ion-thumbnail item-start>\n    <img src="{{current_song.thumbnail}}" width="100%">\n  </ion-thumbnail>\n\n  <ion-grid>\n    <ion-row text-center>\n      <h2 style="text-align: center; width: 100%">{{current_song.title}}</h2>\n    </ion-row>\n    <ion-row>\n      <ion-item>\n        <ion-range [(ngModel)]="volume" (ionChange)="notifyVolumeChange()" debounce="100">\n          <ion-icon range-left small name="volume-off"></ion-icon>\n          <ion-icon range-right name="volume-up"></ion-icon>\n        </ion-range>\n      </ion-item>\n    </ion-row>\n    <ion-row text-center>\n      <ion-col>\n        <button ion-button color="light" icon-start (click)="playPrev()">\n          <ion-icon name=\'arrow-back\'></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col>\n        <button ion-button color=\'light\' icon-center (click)="playPause()">\n          <ion-icon [name]="playicon"></ion-icon>\n        </button>\n      </ion-col>\n      <ion-col>\n\n        <button ion-button color="light" (click)="playNext()">\n          <ion-icon name=\'arrow-forward\'></ion-icon>\n        </button>\n\n      </ion-col>\n    </ion-row>\n  </ion-grid>\n  <button ion-button round outline block style="margin-bottom: 50px" (click)="addRemoveSong()" *ngIf="current_song.title != \'Music\'">{{buttontext}}</button>\n</ion-content>'/*ion-inline-end:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\control\control.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* NavParams */], __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */]])
    ], ControlPage);
    return ControlPage;
}());

//# sourceMappingURL=control.js.map

/***/ }),

/***/ 202:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ConnectPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_global_global__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ConnectPage = (function () {
    function ConnectPage(navCtrl, http, storage, alertCtrl, global) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.global = global;
        this.myip = '';
        this.global.myip = this.myip;
    }
    ConnectPage.prototype.connectToIP = function () {
        var _this = this;
        this.http.get('http://' + this.myip + '/ping')
            .subscribe(function (data) {
            data = data.json();
            console.log(data);
            // console.log(data.data); // data received by server
            // console.log(data.headers);
            // alert(data)
            // this.showAlert(data)
            if (data['available'] == true) {
                // this.storage.set('currentip', this.myip);
                _this.global.myip = _this.myip;
                // this.navCtrl.push(SongsPage, {
                //     id: "123",
                //     name: "Carl",
                //     currentip: this.myip
                // });
                _this.navCtrl.parent.select(3);
            }
        }, function (err) {
            console.log("Oops!");
            _this.showAlert(err);
        });
    };
    ConnectPage.prototype.showAlert = function (data) {
        var alert = this.alertCtrl.create({
            title: 'Alert!',
            subTitle: data,
            buttons: ['OK']
        });
        alert.present();
    };
    ConnectPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-connect',template:/*ion-inline-start:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\connect\connect.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>Connect</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  \n  <ion-item>\n    <ion-label>Enter IP</ion-label>\n    <ion-input [(ngModel)]="myip" type="text"></ion-input>\n  </ion-item>\n\n  <div padding>\n    <button ion-button color="primary" block (click)="connectToIP()">Connect</button>\n</div>\n</ion-content>\n'/*ion-inline-end:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\connect\connect.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* Http */], __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_5__providers_global_global__["a" /* GlobalProvider */]])
    ], ConnectPage);
    return ConnectPage;
}());

//# sourceMappingURL=connect.js.map

/***/ }),

/***/ 203:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SongsPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_global_global__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SongsPage = (function () {
    function SongsPage(navCtrl, global, storage, http) {
        this.navCtrl = navCtrl;
        this.global = global;
        this.storage = storage;
        this.http = http;
        this.myip = '';
        this.songs = [];
        this.myip = global.myip;
        this.songs = this.global.mysongs;
    }
    SongsPage.prototype.itemSelected = function (item) {
        var _this = this;
        console.log(item);
        this.http.get('http://' + this.myip + '/goto_song?' + item.url)
            .subscribe(function (data) {
            // let mydata = data.json()
            // this.songs = mydata
            console.log(data);
            _this.global.update({ current_song: item });
            _this.global.play(null);
            // this.global.playing = true;
            // this.global.mysongs.push(item);
        }, function (err) {
            console.log("Oops!");
            // this.showAlert(err)
        });
    };
    SongsPage.prototype.removeSong = function (item) {
        this.global.remove_song_from_library(item);
    };
    SongsPage.prototype.ionViewWillEnter = function () {
        console.log('will enter');
        this.songs = this.global.mysongs;
        this.myip = this.global.myip;
    };
    SongsPage.prototype.getItems = function (ev) {
        // Reset items back to all of the items
        this.songs = this.global.mysongs;
        // set val to the value of the searchbar
        var val = ev.target.value;
        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
            this.songs = this.songs.filter(function (item) {
                return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
    };
    SongsPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-songs',template:/*ion-inline-start:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\songs\songs.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Library\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-searchbar (ionInput)="getItems($event)"></ion-searchbar>\n  <ion-list>\n    <ion-item-sliding *ngFor="let item of songs">\n      <!-- <ion-item> -->\n        <button ion-item  (click)="itemSelected(item)">\n          <ion-avatar item-start>\n            <img src="{{ item.thumbnail }}">\n          </ion-avatar>\n          {{ item.title }}\n        </button>\n      <!-- </ion-item> -->\n      <ion-item-options>\n        <button ion-button color="danger" icon-start (click)="removeSong(item)">\n          <ion-icon name="trash"></ion-icon>\n          Remove\n        </button>\n      </ion-item-options>\n    </ion-item-sliding>\n  </ion-list>\n</ion-content>'/*ion-inline-end:"D:\Projectos\YoutubeRemote\mobile_app\src\pages\songs\songs.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* NavController */], __WEBPACK_IMPORTED_MODULE_2__providers_global_global__["a" /* GlobalProvider */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__angular_http__["a" /* Http */]])
    ], SongsPage);
    return SongsPage;
}());

//# sourceMappingURL=songs.js.map

/***/ }),

/***/ 204:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(205);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(228);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__(270);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_connect_connect__ = __webpack_require__(202);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_control_control__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_search_search__ = __webpack_require__(200);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_songs_songs__ = __webpack_require__(203);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__ = __webpack_require__(199);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ionic_storage__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_global_global__ = __webpack_require__(41);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};














var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_control_control__["a" /* ControlPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_connect_connect__["a" /* ConnectPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_songs_songs__["a" /* SongsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */], {}, {
                    links: []
                }),
                __WEBPACK_IMPORTED_MODULE_11__ionic_storage__["a" /* IonicStorageModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_12__angular_http__["b" /* HttpModule */],
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_5__pages_control_control__["a" /* ControlPage */],
                __WEBPACK_IMPORTED_MODULE_4__pages_connect_connect__["a" /* ConnectPage */],
                __WEBPACK_IMPORTED_MODULE_6__pages_search_search__["a" /* SearchPage */],
                __WEBPACK_IMPORTED_MODULE_7__pages_songs_songs__["a" /* SongsPage */],
                __WEBPACK_IMPORTED_MODULE_8__pages_tabs_tabs__["a" /* TabsPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_9__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_10__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_global_global__["a" /* GlobalProvider */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 270:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_tabs_tabs__["a" /* TabsPage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"D:\Projectos\YoutubeRemote\mobile_app\src\app\app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"D:\Projectos\YoutubeRemote\mobile_app\src\app\app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 41:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GlobalProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(42);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
// import { HttpClient } from '@angular/common/http';


/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var GlobalProvider = (function () {
    function GlobalProvider(storage) {
        var _this = this;
        this.storage = storage;
        this.mysongs = [];
        this.playicon = 'play';
        var mip = document.location.href;
        if (mip.indexOf('http://') >= 0) {
            mip = mip.substring(7, mip.length - 1);
        }
        this.myip = mip;
        console.log(this.myip);
        console.log('Hello GlobalProvider Provider');
        this.current_song = {
            'thumbnail': '../../assets/imgs/music.png',
            'url': '',
            'title': 'Music'
        };
        // this.storage.set('mysongs', null)
        this.storage.get('mysongs').then(function (val) {
            // console.log('Your age is', val);
            // this.myip = val;
            if (val != null) {
                console.log("val is " + val);
                // val = JSON.parse(val)
                console.log(val);
                val.forEach(function (element) {
                    _this.mysongs.push(element);
                });
            }
        });
        this.storage.get('current_song').then(function (val) {
            // console.log('Your age is', val);
            // this.myip = val;
            if (val != null) {
                _this.current_song = val;
            }
            console.log("val is " + val);
        });
    }
    GlobalProvider.prototype.play = function (self) {
        this.playing = true;
        this.playicon = 'pause';
        if (self != null) {
            self.playicon = this.playicon;
            self.playing = this.playing;
        }
    };
    GlobalProvider.prototype.pause = function (self) {
        this.playing = false;
        this.playicon = 'play';
        self.playicon = this.playicon;
        self.playing = this.playing;
    };
    GlobalProvider.prototype.update = function (obj, target) {
        for (var prop in obj) {
            this.update_localstorage(prop, obj[prop]);
            var val = obj[prop];
            if (typeof val == "object")
                this.update(obj[prop], this[prop]);
            else {
                if (target) {
                    target[prop] = val;
                }
                else {
                    this[prop] = val;
                }
            }
        }
        return obj;
    };
    GlobalProvider.prototype.update_localstorage = function (key, value) {
        if (key == 'current_song') {
            // this.storage.set(key, value)
            // this.storage.set(key, null)
        }
        else if (key == 'mysongs') {
            this.storage.set(key, value);
        }
    };
    GlobalProvider.prototype.add_song_to_library = function (song) {
        console.log('added songs to library');
        if (this.song_index(song) == -1) {
            this.mysongs.push(song);
            this.storage.set('mysongs', this.mysongs);
            // get('mysongs')
        }
    };
    GlobalProvider.prototype.remove_song_from_library = function (song) {
        var song_index = this.song_index(song);
        // console.log(song_index)
        if (song_index >= 0) {
            this.mysongs.splice(song_index, 1);
            this.update_localstorage('mysongs', this.mysongs);
        }
    };
    GlobalProvider.prototype.song_index = function (song) {
        var i;
        for (i = 0; i < this.mysongs.length; i++) {
            if (this.mysongs[i].url === song.url) {
                return i;
            }
        }
        return -1;
    };
    GlobalProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], GlobalProvider);
    return GlobalProvider;
}());

//# sourceMappingURL=global.js.map

/***/ })

},[204]);
//# sourceMappingURL=main.js.map