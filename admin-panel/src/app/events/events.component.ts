import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

	events: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {
		this.http.get("/api/events").subscribe(data => {
      this.events = data;
    });
  }

}
