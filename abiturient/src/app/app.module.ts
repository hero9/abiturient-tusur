import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
/* import { JwtHelperService, JwtModule } from '@auth0/angular-jwt'; */

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';
import { AuthServiceProvider } from '../providers/auth/auth-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
		ListPage,
		LoginPage,
  ],
  imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
		ListPage,
		LoginPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider,
    AuthServiceProvider
  ]
})
export class AppModule {}
