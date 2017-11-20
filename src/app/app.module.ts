import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { CommentPage } from '../pages/comment/comment';
import { ContactPage } from '../pages/contact/contact';
import { DishdetailPage } from '../pages/dishdetail/dishdetail';
import { FavoritesPage } from '../pages/favorites/favorites';
import { LoginPage } from '../pages/login/login';
import { MenuPage } from '../pages/menu/menu';
import { ReservationPage } from '../pages/reservation/reservation';


import { DishProvider } from '../providers/dish/dish';
import { FavoriteProvider } from '../providers/favorite/favorite';
import { LeaderProvider } from '../providers/leader/leader';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';
import { PromotionProvider } from '../providers/promotion/promotion';

import { baseURL } from '../shared/baseurl';

import { MyApp } from './app.component';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    CommentPage,
    DishdetailPage,
    FavoritesPage,
    LoginPage,
    MenuPage,
    ReservationPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    ContactPage,
    CommentPage,
    DishdetailPage,
    FavoritesPage,
    LoginPage,
    MenuPage,
    ReservationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DishProvider,
    LeaderProvider,
    PromotionProvider,
    ProcessHttpmsgProvider,
    { provide: 'BaseURL', useValue: baseURL },
    FavoriteProvider
  ]
})
export class AppModule {}
