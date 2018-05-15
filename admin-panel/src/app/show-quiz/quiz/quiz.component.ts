import { HttpClient } from "@angular/common/http";
import { DataService } from "./../../data.service";
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {
  public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
  myForm: any;
  isCorrect: Boolean = false;
  question: any;
  cost: any;
  options = [];
  option: any;
  hideCheckbox: Boolean = false;
  quiz: Object;
  answer_option: string;

  ngOnInit() {}

  constructor(
    private _dataService: DataService,
    private _http: HttpClient,
    private _router: Router
  ) {
    this.alerts.push({
      id: 1,
      type: "success",
      message:
        "Вопрос добавлен! Вы будете перенаправлены на страницу викторины..."
    });
  }

  addOption(option) {
    this.options.push({
      text: option,
      isCorrect: this.isCorrect
    });
    this.answer_option = "";
    if (this.isCorrect) {
      this.hideCheckbox = true;
      this.isCorrect = false;
    }
	}

  saveQuestion(question, cost) {
    this._dataService.saveQuestion(question, this.options, cost);
    this._http.get("/api/quiz").subscribe(data => {
			this.quiz = data;
			setTimeout(() => {
				this._router.navigate(['/show-quiz']);
			}, 3000);
		});
	}
	
	onClickMe(){
    this.showAlert = true;
    setTimeout(
      function() {
        this.showAlert = false;
      }.bind(this),
      3000
		);
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
