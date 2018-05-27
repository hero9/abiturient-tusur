import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../../providers/auth/auth-service';
import { HttpClient } from "@angular/common/http";
import { LoginPage } from '../../login/login';

@IonicPage()
@Component({
  selector: 'page-show-events',
  templateUrl: 'show-events.html',
})
export class ShowEventsPage {

	event: {};
	event_id : any;
	
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
		this.event_id = navParams.data.event_id;
		this._http.get(`${auth.rootUrl}/events/${this.event_id}`)
		.subscribe(data => {
			this.event = data;
		});
  }

}
