import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { ProfilePage } from './../pages/profile/profile';
import { NewsPage } from '../pages/news/news';
import { QuizPage } from '../pages/quiz/quiz';
import { HomePage } from '../pages/home/home';
import { EventsPage } from './../pages/events/events';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;

	rootPage: any = ProfilePage;
	activePage: any;

  pages: Array<{title: string, component: any, icon: any}>;

  constructor(
		public platform: Platform, 
		public statusBar: StatusBar, 
		public splashScreen: SplashScreen,
	) {
    this.initializeApp();

    this.pages = [
			{ title: 'Личный кабинет', component: ProfilePage, icon: 'appname-person' },
			{ title: 'Новости', component: NewsPage, icon: 'appname-news' },
			{ title: 'Мероприятия', component: EventsPage, icon: 'appname-event' },
			{ title: 'Викторина', component: QuizPage, icon: 'appname-quiz' }
		];
		
		this.activePage = this.pages[1]; 

	}
	

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
		this.nav.setRoot(page.component);
		this.activePage = page;
	}
	
	logout(){
		localStorage.removeItem("jwtToken");
		this.nav.setRoot( HomePage );
	}

	public checkActive(page): boolean {
		return page === this.activePage;
	}


}
