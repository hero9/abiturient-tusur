import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {

	quiz: Array<object>;
	quizes: {};

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		private _http: HttpClient
	) { }

  ionViewDidLoad() {
    this._http.get("http://localhost:8080/api/quiz").subscribe(data => {
		this.quizes = data;
	});
  }

}
