import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { ConnectPage } from '../pages/connect/connect';
import { ControlPage } from '../pages/control/control';
import { SearchPage } from '../pages/search/search';
import {SongsPage} from '../pages/songs/songs'
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { GlobalProvider } from '../providers/global/global';

@NgModule({
  declarations: [
    MyApp,
    ControlPage,
    ConnectPage,
    SearchPage,
    SongsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ControlPage,
    ConnectPage,
    SearchPage,
    SongsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    GlobalProvider
  ]
})
export class AppModule { }
