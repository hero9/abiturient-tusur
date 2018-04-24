import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../data.service";
import { froalaEditor } from "froala-editor";
import * as hash from "hash-string";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.css']
})
export class AddPageComponent implements OnInit {

	pages: any;

	public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;

	constructor(
    private http: HttpClient,
		private dataservice: DataService
	) {
		this.alerts.push({
      id: 1,
      type: "success",
      message: "Ваша новость добавлена!"
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
	
	savePages(title, content) {
		this.dataservice.savePages(hash(title), title, content);
  }

  ngOnInit() {
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}