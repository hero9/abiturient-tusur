import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";

@Component({
  selector: 'app-page-content',
  templateUrl: './page-content.component.html',
  styleUrls: ['./page-content.component.css']
})
export class PageContentComponent implements OnInit {

	pageContent: {};

  constructor( private http: HttpClient, private data: DataService ) { }

  ngOnInit() {
		this.http.get(`/api/pages/${this.data.page}`).subscribe(data => {
			this.pageContent = data;
		});
  }

}
