import { Component, OnInit } from '@angular/core';
import { DataService } from "../../data.service";
import { froalaEditor } from "froala-editor";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
	
	editPage: any;
  public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
	editorContent : any;

  constructor(private _http: HttpClient, private _data: DataService) {
    this.alerts.push({
      id: 1,
      type: "success",
      message: "Страница перезаписана!"
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
    this._http.get(`/api/pages/${this._data.editPageID}`).subscribe(data => {
			this.editPage = data;
			this.editorContent = this.editPage.content;
    });
  }

  updatePage(title, content) {
    this._http
      .put(`/api/pages/${this._data.editPageID}`, {
        title: title,
        content: content
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