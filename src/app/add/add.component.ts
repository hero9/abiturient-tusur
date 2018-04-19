import { Input, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	news: any;
	events: any;
	emp : String = '';

	public alerts: Array<IAlert> = [];
	public showAlert: Boolean = false;
	

	constructor( private http: HttpClient, private dataservice: DataService, private router: Router ) { 
		this.alerts.push({
      id: 1,
      type: 'success',
      message: 'Ваша запись добавлена!',
    });
	}

	saveNews(title, newsPreview, newsText) {
		this.dataservice.saveNews(title, newsPreview, newsText);
		this.http.get('/api/news').subscribe(data => {
			this.news = data;
		});
	}

	saveEvent(title, eventPreview, eventText) {
		this.dataservice.saveEvent(title, eventPreview, eventText);
		this.http.get('/api/events').subscribe(data => {
			this.events = data;
		});
	}

	public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
	}

	onClickMe() : void {
		this.showAlert = true;
		setTimeout(function () {
			this.showAlert = false;
		}.bind(this), 3000);
		this.emp = ' ';
	}

  ngOnInit() {

		this.http.get('/api/news').subscribe(data => {
			this.news = data;
		});	

	}
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
