import { Component, EventEmitter, OnInit, DoCheck } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit, DoCheck {
	title = 'Admin Panel';
	menuItems: MenuItem[];
	options: FormGroup;
	isAuth: Boolean;

	constructor(
		fb: FormBuilder, 
		private http: HttpClient, 
		public router: Router
	) {
		
			this.options = fb.group({
				'fixed': false,
				'top': 0,
				'bottom': 0,
			});

			this.menuItems = [
				{ name: "Статистика", route: "/stats" },
				{ name: "Игры", route: "/apps" },
				{ name: "Новости", route: "/news" },
				{ name: "Мероприятия", route: "/events" },
				{ name: "Настройки", route: "/settings" },
				{ name: "Страницы", route: "/page" },
				{ name: "Викторина", route:"/show-quiz" },
			];
	}

	ngOnInit(){  }

	ngDoCheck( ) {
		if(localStorage.getItem("jwtToken") === null) {
			this.isAuth = false;
		} else {
			this.isAuth = true;
		}
	}

	logout() {
		localStorage.removeItem("jwtToken");
		this.router.navigate(['auth']);
	}

}

export interface MenuItem {
	name: string;
	route: string;
}
