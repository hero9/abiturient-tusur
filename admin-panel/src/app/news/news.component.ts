import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

	news: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
		this.http.get("/api/news").subscribe(data => {
      this.news = data;
    });
  }

}
