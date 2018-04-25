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

	constructor( private _http: Http ) { }

	

	saveNews(id, title, newsPreview, newsText) {
    const obj = {
			id: id,
			title: title,
			newsPreview : newsPreview,
			newsText: newsText
    };
    this._http.post("/api/news", obj)
        .subscribe(res => console.log("done"));
	}

	savePages(id, title, content) {
    const obj = {
			id: id,
			title: title,
			content: content
    };
    this._http.post("/api/pages", obj)
        .subscribe(res => console.log("done"));
	}
	
	saveEvent(title, eventPreview, eventText) {
    const obj = {
			title: title,
			eventPreview : eventPreview,
			eventText: eventText
    };
    this._http.post("/api/events", obj)
        .subscribe(res => console.log("done"));
  }
	
	getStudents() {
		return this._http.get("/api/students")
			.map(result => this.result = result.json().data);
	}

}
