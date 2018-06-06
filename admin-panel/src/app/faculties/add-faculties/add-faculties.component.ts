import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-add-faculties',
  templateUrl: './add-faculties.component.html',
  styleUrls: ['./add-faculties.component.css']
})
export class AddFacultiesComponent implements OnInit {
	
	faculties: any;
	public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
  specialties = [];
  points_add: string;
  specialties_add: string;

  ngOnInit() {}

  constructor(
    private _dataService: DataService,
    private _http: HttpClient,
    private _router: Router
  ) {
    this.alerts.push({
      id: 1,
      type: "success",
      message:
        "Факультет добавлен! Вы будете перенаправлены на страницу факультетов..."
    });
  }

  addSpecialty(specialty, points) {
    this.specialties.push({
      title: specialty,
      points: points
		});
		this.specialties_add = "";
		this.points_add = "";
	}

  saveFaculty(title, description, grants) {
    this._dataService.saveFaculty(title, this.specialties, description, grants);
    this._http.get("/api/faculties").subscribe(data => {
			this.faculties = data;
			setTimeout(() => {
				this._router.navigate(['/faculties']);
			}, 3000);
		});
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

}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
