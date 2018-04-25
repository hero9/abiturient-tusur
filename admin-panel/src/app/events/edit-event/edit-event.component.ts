import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { froalaEditor } from "froala-editor";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.css']
})
export class EditEventComponent implements OnInit {
  editEvent: any;
  public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
	editorContent : any;

  constructor(private _http: HttpClient, private _data: DataService) {
    this.alerts.push({
      id: 1,
      type: "success",
      message: "Мероприятие перезаписано!"
    });
  }
	public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  onClickMe() {
    this.showAlert = true;
    setTimeout(
      function() {
        this.showAlert = false;
      }.bind(this),
      3000
    );
  }

  ngOnInit() {
    this._http.get(`/api/events/${this._data.editEventID}`).subscribe(data => {
			this.editEvent = data;
			this.editorContent = this.editEvent.eventText;
    });
  }

  updateEvent(title, eventPreview, eventText) {
    this._http
      .put(`/api/events/${this._data.editEventID}`, {
        title: title,
        eventPreview: eventPreview,
        eventText: eventText
      })
      .subscribe(
        res => {
          let id = res["id"];
        },
        err => {
          console.log(err);
        }
      );
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
