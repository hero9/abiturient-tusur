import { Input, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../data.service";
import { froalaEditor } from "froala-editor";
import * as hash from "hash-string";


@Component({
  selector: "app-add",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.component.css"]
})
export class AddComponent implements OnInit {
	
  news: any;
	events: any;
	emp: any = '';

  public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;

  constructor(
    private http: HttpClient,
    private dataservice: DataService,
		private router: Router,
  ) {

    this.alerts.push({
      id: 1,
      type: "success",
      message: "Ваша запись добавлена!"
		});
		
  }

  saveNews(title, newsPreview, newsText) {
		this.dataservice.saveNews(hash(title), title, newsPreview, newsText);
    this.http.get("/api/news").subscribe(data => {
			this.news = data;
		});
  }

  saveEvent(eventTitle, eventPreview, eventText) {
    this.dataservice.saveEvent(eventTitle, eventPreview, eventText);
    this.http.get("/api/events").subscribe(data => {
      this.events = data;
    });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  onClickMe(){
    this.showAlert = true;
    setTimeout(
      function() {
        this.showAlert = false;
      }.bind(this),
      3000
		);
  }

  ngOnInit() {
    this.http.get("/api/news").subscribe(data => {
      this.news = data;
    });
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
