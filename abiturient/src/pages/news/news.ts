import { LoginPage } from './../login/login';
import { AuthServiceProvider } from './../../providers/auth/auth-service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'page-list',
  templateUrl: 'news.html'
})
export class NewsPage {
	
	news : {};
	
	ionViewCanEnter(): boolean {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem('token');
			this.navCtrl.push( LoginPage );
      return false;
    }
    return true;
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

  
}
