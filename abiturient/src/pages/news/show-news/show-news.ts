import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../../providers/auth/auth-service';
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-show-news',
  templateUrl: 'show-news.html',
})
export class ShowNewsPage {

	news: {};
	news_id : any;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this.news_id = navParams.data.news_id;
		this._http.get(`http://212.237.5.70:8080/api/news/${this.news_id}`)
		.subscribe(data => {
			this.news = data;
		});
	}

}
