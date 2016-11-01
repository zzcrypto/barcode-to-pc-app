import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { Settings } from '../providers/settings';


@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  public rootPage;

  constructor(platform: Platform, private settings: Settings) {
    this.rootPage = WelcomePage;

    Promise.all([

      this.settings.getNoRunnings().then(
        value => {
          if (!value) {
            this.rootPage = WelcomePage;
          }
          let runnings = value || 0;
          this.settings.setNoRunnings(++runnings);
        }
      ),

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        StatusBar.styleDefault();
        StatusBar.overlaysWebView(true);
        StatusBar.backgroundColorByHexString('#B71C1C');
      })
    ])

      .then(
      () => {
        Splashscreen.hide();
      })
  }
}