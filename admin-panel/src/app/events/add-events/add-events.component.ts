import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";
import { froalaEditor } from "froala-editor";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-events',
	templateUrl: './add-events.component.html',
	styleUrls: ['./add-events.component.css']
})
export class AddEventsComponent implements OnInit {

	public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
	events: any;
	public froalaContent: string = '';
	previewImage: any;
	labelText: string = "Загрузить изображение";
	startDate1: {};
	endDate1: {};

	edtContent($event : string){
		this.froalaContent = $event;
	}

	constructor(
		private http: HttpClient, 
		private dataservice: DataService,
		private router: Router
	) { 
		this.alerts.push({
      id: 1,
      type: "success",
      message: "Мероприятие добавлено! Вы будете перенаправлены на страницу мероприятий..."
		});
	}

	previewFile() {
		let file = (document.querySelector('.upload_file') as HTMLInputElement).files[0]; 
		const fileReader: FileReader = new FileReader();
		this.labelText = file.name;

		fileReader.onloadend = (event : Event) => {
			let previewImage = fileReader.result;
			this.previewImage = previewImage;
		}
		fileReader.readAsDataURL(file);
	}
	
	saveEvent(eventTitle, eventPreview) {
    this.dataservice.saveEvent(eventTitle, this.startDate1, this.endDate1, this.previewImage, eventPreview, this.froalaContent);
    this.http.get("/api/events").subscribe(data => {
			this.events = data;
			setTimeout(() => {
				this.router.navigate(['/events']);
			}, 3000);
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
