import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { HttpClient } from "@angular/common/http";
import { forkJoin } from "rxjs/observable/forkJoin";
import { AlertController } from 'ionic-angular';
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
	notAnsweredLength: Number;
	answeredLength: Number;

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
		public auth: AuthServiceProvider,
		public alertCtrl: AlertController
	) {}
	
	showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Внимание!',
      subTitle: 'Вы уже ответили на данный вопрос!',
			buttons: ['OK'],
			cssClass: 'alert_custom'
    });
    alert.present();
  }

  getQuestion(_id: string) {
    this.navCtrl.push(ShowQuestionPage, { question_id: _id });
  }

  ionViewDidLoad() {
    let questions = this._http.get<any[]>(`${this.auth.rootUrl}/quiz`);
    let scores = this._http.get<any[]>(`${this.auth.rootUrl}/score`);

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
			this.notAnsweredLength = this.notAnswered.length;
			this.answeredLength = this.answered.length;
    });
  }
}
