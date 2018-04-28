import { HomePage } from './../home/home';
import { ListPage } from '../list/list';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AuthServiceProvider } from '../../providers/auth/auth-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	responseData: any;
	message = '';
	data: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public authService: AuthServiceProvider,
		private _http: HttpClient,
	) {
  }

  ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage');
	}
	
	login(email, password) {
		this._http.post('http://localhost:3000/api/signin',{ email : email, password : password })
		.subscribe(res => {
			this.data = res;
			localStorage.setItem('jwtToken', this.data.token);
			this.navCtrl.push( ListPage );
		}, err => {
			this.message = err.error.msg;
		});
	}

	logout() {
		localStorage.removeItem("jwtToken");
		this.navCtrl.push( HomePage );
	}

}
