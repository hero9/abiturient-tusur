import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QuizPage } from './../quiz';


@IonicPage()
@Component({
  selector: 'page-show-question',
  templateUrl: 'show-question.html',
})
export class ShowQuestionPage {

	question: {};
	question_id : any;
	message: string;

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _http: HttpClient
	) {
		this.question_id = navParams.data.question_id;
		/* this._http.get(`http://212.237.5.70:8080/api/quiz/${this.question_id}`) */
		this._http.get(`http://localhost:8080/api/quiz/${this.question_id}`)
		.subscribe(data => {
			this.question = data;
		});
	}

	chooseAnswer(options_id: string){
		/* this._http.post(`http://212.237.5.70:8080/api/quiz/answer/${this.question_id}`,{ id : options_id }) */
		this._http.post(`http://localhost:8080/api/quiz/answer/${this.question_id}`, { id : options_id })
		.subscribe(res => {
			console.log("DONE");
			this.navCtrl.setRoot( QuizPage );
		}, err => {
			this.message = err.error.msg;
			console.log(` ERRRORRR ${this.message}`);
		});
	}

}
