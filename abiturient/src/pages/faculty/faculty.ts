import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { AuthServiceProvider } from './../../providers/auth/auth-service';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-faculty',
  templateUrl: 'faculty.html',
})
export class FacultyPage {

	faculties: any;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private _http: HttpClient,
	) {
		this._http.get(`${auth.rootUrl}/faculties`).subscribe(data => {	
			this.faculties = data;
		});
	}

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem("token");
      this.navCtrl.push( LoginPage );
    }
  }

}
