import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	result: any;
	page: string;
	editNewsID: any;
	editEventID: any;
	editPageID: any;

	constructor( private _http: Http, private http: HttpClient ) { }

	saveNews(id, title, imagePreview, newsPreview, newsText) {
    const obj = {
			id: id,
			title: title,
			imagePreview: imagePreview,
			newsPreview : newsPreview,
			newsText: newsText
    };
    this.http.post("/api/news", obj)
        .subscribe(res => console.log("done"));
	}

	saveQuestion(question, options, cost){
		const obj = {
			question: question,
			options: options,
			cost: cost
		};
		this.http.post("/api/quiz", obj)
			.subscribe(res => console.log("question done"));
	}

	savePages(id, title, content) {
    const obj = {
			id: id,
			title: title,
			content: content
    };
    this.http.post("/api/pages", obj)
        .subscribe(res => console.log("done"));
	}
	
	saveEvent(title, eventPreview, eventText) {
    const obj = {
			title: title,
			eventPreview : eventPreview,
			eventText: eventText
    };
    this.http.post("/api/events", obj)
        .subscribe(res => console.log("done"));
  }
	
	getStudents() {
		return this._http.get("/api/students")
			.map(result => this.result = result.json().data);
	}

}
