import { Input, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';
import { element } from 'protractor';
import { DataService } from '../data.service';
import { type } from 'os';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
	styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	news: any;

	public alerts: Array<IAlert> = [];
	public showAlert: Boolean = false;
	

	constructor( private http: HttpClient, private dataservice: DataService, private router: Router ) { 
		this.alerts.push({
      id: 1,
      type: 'success',
      message: 'This is an success alert',
    });
	}

	saveNews(title, newsPreview, newsText, element) {
		let file = element.files[0];
		let reader = new FileReader();
		reader.onloadend = function () {
			return reader.result;
		}	
		reader.readAsDataURL(file);
		this.dataservice.saveNews(title, newsPreview, newsText, reader.result);
	}

/* 	encodeImageFileAsURL(element) {
		let file = element.files[0];
		let reader = new FileReader();
		reader.onloadend = () => {
			reader.result;
		}		
		reader.readAsDataURL(file);
		return reader.result;
	} */

	public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
	}

	onClickMe() : void {
		this.showAlert = true;
		setTimeout(function () {
			this.showAlert = false;
		}.bind(this), 3000);
	}

  ngOnInit() {

		this.http.get('/api/news').subscribe(data => {
			this.news = data;
		});	

		$(document).ready(function() {
			$('#chooseFile').bind('change', function () {
				let filename: any = $("#chooseFile").val();
				if (/^\s*$/.test(filename)) {
					$(".file-upload").removeClass('active');
					$("#noFile").text("No file chosen..."); 
				}
				else {
					$(".file-upload").addClass('active');
					$("#noFile").text(filename.replace("C:\\fakepath\\", ""));
				}
			});
		});
	}
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
