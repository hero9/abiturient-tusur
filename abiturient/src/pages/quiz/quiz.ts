import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs/observable/forkJoin";
import { HomePage } from "../home/home";
import { AuthServiceProvider } from "./../../providers/auth/auth-service";
import { ShowQuestionPage } from "./show-question/show-question";

@IonicPage()
@Component({
  selector: "page-quiz",
  templateUrl: "quiz.html"
})
export class QuizPage {

  quiz: Array<object>;
	answered: any = [];
	notAnswered: any = [];

  ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
      localStorage.removeItem("token");
      this.navCtrl.push(HomePage);
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private _http: HttpClient,
    public auth: AuthServiceProvider
  ) {}

  getQuestion(_id: string) {
    this.navCtrl.push(ShowQuestionPage, { question_id: _id });
  }

  ionViewDidLoad() {

		/* let questions = this._http.get<any[]>("http://212.237.5.70:8080/api/quiz");
		let scores = this._http.get("http://212.237.5.70:8080/api/score"); */
    let questions = this._http.get<any[]>("http://localhost:8080/api/quiz");
    let scores = this._http.get<any[]>("http://localhost:8080/api/score");

    forkJoin([questions, scores]).subscribe(results => {
			let questions = results[0];
			let quizIDs = results[1];
			questions.forEach(question => {
				if(quizIDs.indexOf(question._id) > -1){
					this.answered.push(question);
				} else {
					this.notAnswered.push(question);
				}
			});
    });
  }
}
