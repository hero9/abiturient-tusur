import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth/auth-service';
import { HttpClient } from "@angular/common/http";
import { HomePage } from './../home/home';
import { ShowEventsPage } from './show-events/show-events';

@IonicPage()
@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {

	events : {};
	id : string;

	constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this._http.get(`${auth.rootUrl}/events`).subscribe(data => {	
			this.events = data;
		});
  }
	
	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem('token');
			this.navCtrl.push( HomePage );
    }
	}

	showEvent(id) {
		this.navCtrl.push(ShowEventsPage, { event_id : id });
	}

}
