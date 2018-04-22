import { Component, OnInit, Input, Output, OnChanges } from '@angular/core';
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})

export class PageComponent implements OnChanges {

	@Input() page: string;
	news: {};

  constructor( private http: HttpClient ) { }

	ngOnChanges( ...args: any[] ) {
		this.http.get(`/api/news/${this.page}`).subscribe(data => {
			this.news = data;
		});
	}
}
