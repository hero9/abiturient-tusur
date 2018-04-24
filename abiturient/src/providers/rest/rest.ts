import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
	}
	
	getNews() {
		return new Promise( resolve => {
			this.http.get('api/news')
			.subscribe( data => {
				resolve(data);
			}, err => {
				console.log(err);
			});
		});
	}



}