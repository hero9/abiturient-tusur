import { HttpClient } from "@angular/common/http";
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth/auth-service';
import { HomePage } from './../home/home';
import { ShowNewsPage } from './show-news/show-news';

@Component({
  selector: 'page-list',
  templateUrl: 'news.html'
})

export class NewsPage {
	
	news : {};
	id : any;	

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem('token');
			this.navCtrl.push( HomePage );
    }
	}
	

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this._http.get("http://localhost:8080/api/news").subscribe(data => {
			this.news = data;
		});
	}

	showNews(id) {
		this.navCtrl.push(ShowNewsPage, { news_id : id });
	}
  
}
