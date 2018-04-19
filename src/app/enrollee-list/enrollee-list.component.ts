import { Component, OnInit } from '@angular/core';
import { DataService } from './../data.service';

@Component({
  selector: 'app-enrollee-list',
  templateUrl: './enrollee-list.component.html',
  styleUrls: ['./enrollee-list.component.css']
})
export class EnrolleeListComponent implements OnInit {

	students: Array<any>;

	constructor (private _dataService: DataService) {
		this._dataService.getStudents()
			.subscribe(res => this.students = res);
	}

	ngOnInit() { 
	}
	
	displayedColumns = ['position', 'fullName', 'dateOfBirth', 'spec'];

}