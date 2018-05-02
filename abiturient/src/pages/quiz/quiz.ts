import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HomePage } from '../home/home';
import { AuthServiceProvider } from './../../providers/auth/auth-service';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

	quiz: Array<object>;
	quizes: {};

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem('token');
			this.navCtrl.push( HomePage );
    }
  }

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _http: HttpClient,
		public auth: AuthServiceProvider,
	) { }

  ionViewDidLoad() {
    this._http.get("http://localhost:8080/api/quiz").subscribe(data => {
		this.quizes = data;
	});
  }

}
