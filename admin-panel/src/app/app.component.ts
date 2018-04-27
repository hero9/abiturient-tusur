import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
	title = 'Admin Panel';
	menuItems: MenuItem[];
	options: FormGroup;

	constructor(fb: FormBuilder, private http: HttpClient, private _router: Router) {
		
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
			{ name: "Страницы", route: "/page" }
		];
	}

	ngOnInit() { }

	logout() {
		localStorage.removeItem("jwtToken");
		this._router.navigate(['stats']);
	}

}

export interface MenuItem {
	name: string;
	route: string;
}
