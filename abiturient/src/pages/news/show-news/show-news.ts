import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../../providers/auth/auth-service';
import { HttpClient } from "@angular/common/http";
import { LoginPage } from '../../login/login';

@IonicPage()
@Component({
  selector: 'page-show-news',
  templateUrl: 'show-news.html',
})
export class ShowNewsPage {

	news: {};
	news_id : any;

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem('token');
			this.navCtrl.push( LoginPage );
    }
	}

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this.news_id = navParams.data.news_id;
		this._http.get(`${auth.rootUrl}/news/${this.news_id}`)
		.subscribe(data => {
			this.news = data;
		});
	}

}
