import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../../providers/auth/auth-service';
import { HttpClient } from "@angular/common/http";

@IonicPage()
@Component({
  selector: 'page-show-events',
  templateUrl: 'show-events.html',
})
export class ShowEventsPage {

	event: {};
	event_id : any;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this.event_id = navParams.data.event_id;
		/* this._http.get(`http://212.237.5.70:8080/api/events/${this.event_id}`) */
		this._http.get(`http://localhost:8080/api/events/${this.event_id}`)
		.subscribe(data => {
			this.event = data;
		});
  }

}
