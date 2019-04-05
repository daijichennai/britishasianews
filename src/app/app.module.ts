import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MatrimonialPage } from "../pages/matrimonial/matrimonial";
import { PropertyPage } from "../pages/property/property";
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpClientModule } from '@angular/common/http';
import { DisplayNewsPage } from '../pages/display-news/display-news';
import { PropertyDisplayPage } from "../pages/property-display/property-display";
import { SocialSharing } from "@ionic-native/social-sharing";
import { Network } from "@ionic-native/network";
import { NetworkProvider } from '../providers/network/network';
import { MatrimonialDisplayPage } from "../pages/matrimonial-display/matrimonial-display";
import { SettingsPage } from "../pages/settings/settings";
import { Firebase } from '@ionic-native/firebase';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { CommfuncProvider } from '../providers/commfunc/commfunc';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    DisplayNewsPage,
    MatrimonialPage,
    MatrimonialDisplayPage,
    PropertyPage,
    PropertyDisplayPage,
    SettingsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    LazyLoadImageModule ,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    DisplayNewsPage,
    MatrimonialPage,
    MatrimonialDisplayPage,
    PropertyPage,
    PropertyDisplayPage,
    SettingsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SocialSharing,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Network,
    Firebase,
    NetworkProvider,
    CommfuncProvider
  ]
})
export class AppModule {}
