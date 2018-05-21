import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { DataService } from '../data.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

	events: any;

	constructor(private _http: HttpClient, private _data: DataService) { }
	
	getEditPage(_id: string) { 
		this._data.editEventID = _id;
	} 
	
	deleteEvent(_id) {
		this._http.delete('/api/events/' + _id)
			.subscribe(res => {
				this._http.get("/api/events").subscribe(data => {
					this.events = data;
				});
			}, 
				(err) => {
					console.log(err);
				}
			);
	};

  ngOnInit() {
		this._http.get("/api/events").subscribe(data => {
			this.events = data;
    });
  }

}
