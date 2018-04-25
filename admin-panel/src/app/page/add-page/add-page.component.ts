import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";
import { froalaEditor } from "froala-editor";
import * as hash from "hash-string";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html'
})
export class AddPageComponent implements OnInit {

	pages: any;

	public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;

	constructor(
    private http: HttpClient,
		private dataservice: DataService,
		private router: Router
	) {
		this.alerts.push({
      id: 1,
      type: "success",
      message: "Страница добавлена! Вы будете перенаправлены на страницу разделов..."
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
		setTimeout(() => {
			this.router.navigate(['/page']);
		}, 3000);
  }

  ngOnInit() {
  }

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}