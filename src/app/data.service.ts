import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

	result: any;

	constructor(private _http: Http) { }

	saveNews(title, newsText, newsPreview, imgFile) {
    const obj = {
			title: title,
			newsPreview : newsPreview,
			imgFile : imgFile,
      newsText: newsText
    };
    this._http.post("/api/news", obj)
        .subscribe(res => console.log("done"));
  }
	
	getStudents() {
		return this._http.get("/api/students")
			.map(result => this.result = result.json().data);
	}

}
