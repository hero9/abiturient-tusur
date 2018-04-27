import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class RestProvider {

	result: any;

  constructor(public http: Http ) {
    console.log('Hello RestProvider Provider');
	}
	
	getNews() {
		return this.http.get("http://localhost:3000/api/news")
			.map(result => this.result = result.json().data);
	}
}