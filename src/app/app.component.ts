import { Component, EventEmitter } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
	title = 'Admin Panel';
	menuItems: MenuItem[];

	constructor() {

		this.menuItems = [
			{ name: "Статистика", route: "/stats" },
			{ name: "Игры", route: "/apps" },
			{ name: "Добавить", route: "/add" },
			{ name: "Настройки", route: "/settings" }
		];
	}

}

export interface MenuItem {
	name: string;
	route: string;
}
