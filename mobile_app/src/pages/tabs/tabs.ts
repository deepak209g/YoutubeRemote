import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { ControlPage } from '../control/control';
import { ConnectPage } from '../connect/connect';
import {SongsPage} from '../songs/songs'

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = ConnectPage;
  tab2Root = SearchPage;
  tab3Root = ControlPage;
  tab4Root = SongsPage;

  constructor() {

  }
}
