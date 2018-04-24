import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit {
	title = 'Admin Panel';
	menuItems: MenuItem[];
	options: FormGroup;
	menu : any;
	page: string;


	constructor(fb: FormBuilder, private http: HttpClient) {
		
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
			{ name: "Добавить разделы", route: "/add-page" }
		];
	}

	getPage(title) {
		this.page = title;
	}

	ngOnInit() {
		this.http.get('/api/menu').subscribe(data => {
			this.menu = data;
		});
	}

}

export interface MenuItem {
	name: string;
	route: string;
}
