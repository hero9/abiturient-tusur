import { Component, OnInit, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import '../../assets/js/login-animation.js';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

	loginData = { email:'', password:'' };
	message = '';
	data: any;

	constructor(
		private _http: HttpClient, 
		private _router: Router, 
	) {	}
	
	login(email, password) {
		this._http.post('/api/signin',{ email : email, password : password })
		.subscribe(res => {
			this.data = res;
			localStorage.setItem('jwtToken', this.data.token);
			this._router.navigate(['stats']);
		}, err => {
			this.message = err.error.msg;
		});
	}

  ngAfterViewInit() {
    (window as any).initialize();
  }

  ngOnInit() {
  }

}
