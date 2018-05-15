import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-show-quiz',
  templateUrl: './show-quiz.component.html',
  styleUrls: ['./show-quiz.component.css']
})
export class ShowQuizComponent implements OnInit {

	quizes: any;

	constructor( private _http: HttpClient ) { }
	
	deleteQuestion(_id) {
		this._http.delete('/api/quiz/' + _id)
			.subscribe(res => {
				this._http.get("/api/quiz").subscribe(data => {
					this.quizes = data;
				});
			}, 
				(err) => {
					console.log(err);
				}
			);
	};

  ngOnInit() {
		this._http.get('/api/quiz').subscribe(data => {
			this.quizes = data;
		});
  }

}
