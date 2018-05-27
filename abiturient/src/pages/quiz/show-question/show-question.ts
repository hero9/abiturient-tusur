import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from './../../../providers/auth/auth-service';
import { QuizPage } from './../quiz';
import { LoginPage } from '../../login/login';

@IonicPage()
@Component({
  selector: 'page-show-question',
  templateUrl: 'show-question.html',
})
export class ShowQuestionPage {

	question: {};
	question_id : any;
	message: string;
	optionState: boolean = false;
	optionID: string;

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem("token");
      this.navCtrl.push( LoginPage );
    }
  }

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _http: HttpClient,
		public auth: AuthServiceProvider
	) {
		this.question_id = navParams.data.question_id;
		this._http.get(`${auth.rootUrl}/quiz/${this.question_id}`)
		.subscribe(data => {
			this.question = data;
		});
	}

	answer(){
		this._http.post(`${this.auth.rootUrl}/quiz/answer/${this.question_id}`, { id : this.optionID })
		.subscribe(res => {
			this.navCtrl.setRoot( QuizPage );
		}, err => {
			this.message = err.error.msg;
		});
	}

	toggleOption(id) {
		this.optionState = true;
		this.optionID = id;
		console.log(id);
	}

}
