import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../data.service";
import { froalaEditor } from "froala-editor";

@Component({
  selector: 'app-add-events',
  templateUrl: './add-events.component.html'
})
export class AddEventsComponent implements OnInit {

	public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
	events: any;

	constructor(private http: HttpClient, private dataservice: DataService) { 
		this.alerts.push({
      id: 1,
      type: "success",
      message: "Ваше мероприятие добавлено!"
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

  ngOnInit() {}

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
