import { Component, OnInit } from '@angular/core';
import * as data from  '../../assets/students.json';

@Component({
  selector: 'app-enrollee-list',
  templateUrl: './enrollee-list.component.html',
  styleUrls: ['./enrollee-list.component.css']
})
export class EnrolleeListComponent implements OnInit {

	ngOnInit() { 
	}
	
	displayedColumns = ['position', 'name', 'weight', 'symbol'];
  dataSource = data;

}

export interface StudentsList {
  position: number;
  fullName: string;
	dateOfBirth: string;
	spec: string;
}