import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../data.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnInit {
	
	page: {};

	getPage(_id: string) { 
    this._data.page = _id; 
	} 
	
	getEditPage(_id: string) { 
		this._data.editPageID = _id;
	}
	deletePage(_id) {
		this._http.delete('/api/pages/' + _id)
			.subscribe(res => {
				this._http.get("/api/pages").subscribe(data => {
					this.page = data;
				});
			}, 
				(err) => {
					console.log(err);
				}
			);
	};

	constructor( private _http: HttpClient, private _data: DataService ) { }


	ngOnInit() {
		this._http.get('/api/pages').subscribe(data => {
			this.page = data;
		});
	}
}
