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

/* const students: StudentsList[] = [
  {position: 1, fullName: "Arsene Wenger", dateOfBirth: "12.02.1445", spec: "Back-End"},
  {position: 2, fullName: "John Travolta", dateOfBirth: "13.02.1998", spec: "Front-End"},
  {position: 3, fullName: "Alice Merton", dateOfBirth: "12.06.1993", spec: "Test"}
]; */