import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-faculties',
  templateUrl: './faculties.component.html',
  styleUrls: ['./faculties.component.css']
})
export class FacultiesComponent implements OnInit {

	faculties: any;

  constructor( private _http: HttpClient ) { }

	
	
	ngOnInit() {
		this._http.get('/api/faculties').subscribe(data => {
			this.faculties = data;
		});
  }

}
