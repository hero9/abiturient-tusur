import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

	public alerts: Array<IAlert> = [];

	constructor() { 
		this.alerts.push({
      id: 1,
      type: 'success',
      message: 'This is an success alert',
    });
	}

	public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
	}	

  ngOnInit() {
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
