import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../data.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

	news: any;

	constructor(private _http: HttpClient, private _data: DataService) { }
	
	getEditNews(_id: string) { 
		this._data.editNewsID = _id;
	};
	
	deleteNews(_id) {
		this._http.delete('/api/news/' + _id)
			.subscribe(res => {
				this._http.get("/api/news").subscribe(data => {
					this.news = data;
				});
			}, 
				(err) => {
					console.log(err);
				}
			);
	};

  ngOnInit() {
		this._http.get("/api/news").subscribe(data => {
      this.news = data;
    });
  }

}
