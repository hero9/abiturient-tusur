import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth/auth-service';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	currentUser: Object;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this._http.get(`${auth.rootUrl}/users`)
		.subscribe(data => {
			this.currentUser = data;
		});
	}

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem("token");
			this.navCtrl.push( HomePage );
    }
	}

}
