import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { JwtModule } from '@auth0/angular-jwt';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { ProfilePage } from './../pages/profile/profile';
import { EditProfilePage } from './../pages/profile/edit-profile/edit-profile';
import { QuizPage } from '../pages/quiz/quiz';
import { ShowQuestionPage } from './../pages/quiz/show-question/show-question';
import { NewsPage } from '../pages/news/news';
import { ShowNewsPage } from './../pages/news/show-news/show-news';
import { EventsPage } from './../pages/events/events';
import { ShowEventsPage } from './../pages/events/show-events/show-events';
import { FacultyPage } from './../pages/faculty/faculty';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth/auth-service';
import { InterceptorModule } from '../providers/auth/interceptor.module';

@NgModule({
  declarations: [
    MyApp,
		LoginPage,
		RegisterPage,
		ProfilePage,
		EditProfilePage,
		QuizPage,
		ShowQuestionPage,
		NewsPage,	
		ShowNewsPage,
		EventsPage,
		ShowEventsPage,
		FacultyPage
  ],
  imports: [
		BrowserModule,
		HttpClientModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('jwtToken');
        },
        whitelistedDomains: ['localhost:8080', 'http://212.237.5.70:8080']
      }
    }),
		InterceptorModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
		LoginPage,
		RegisterPage,
		ProfilePage,
		EditProfilePage,
		QuizPage,
		ShowQuestionPage,
		NewsPage,
		ShowNewsPage,
		EventsPage,
		ShowEventsPage,
		FacultyPage
  ],
  providers: [
    StatusBar,
		SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
		AuthServiceProvider,
		EditProfilePage
  ]
})
export class AppModule {}
