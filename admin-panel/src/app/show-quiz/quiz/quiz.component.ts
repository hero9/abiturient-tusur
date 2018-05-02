import { HttpClient } from '@angular/common/http';
import { DataService } from './../../data.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-quiz",
  templateUrl: "./quiz.component.html",
  styleUrls: ["./quiz.component.css"]
})
export class QuizComponent implements OnInit {

	myForm: any;
	isCorrect : Boolean = false;
	question : any;
	cost : any;
	options = [];
	option: any;
	hideCheckbox: Boolean = false;
	quiz: Object;

  ngOnInit() { }

	constructor( 
		private _dataService: DataService, 
		private _http: HttpClient, 
		private _router: Router
	) {	}

	addOption(option){
		this.options.push({
			text: option, 
			isCorrect: this.isCorrect 
		});
		if(this.isCorrect) {
			this.hideCheckbox = true;
			this.isCorrect = false;
		}
	}

	saveQuestion(question, cost){
		this._dataService.saveQuestion(question, this.options, cost);
    this._http.get("/api/quiz").subscribe(data => {
			this.quiz = data;
			setTimeout(() => {
				this._router.navigate(['/news']);
			}, 3000);
		});
		console.log(this.options);
	}

  onSubmit() {
    if (this.myForm.valid) {
      this.myForm.reset();
    }
  }
}
