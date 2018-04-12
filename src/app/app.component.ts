import { Component, EventEmitter,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'Admin Panel';
	menuItems: MenuItem[];
	options: FormGroup;


	constructor(fb: FormBuilder) {
		
		this.options = fb.group({
      'fixed': false,
      'top': 0,
      'bottom': 0,
    });

		this.menuItems = [
			{ name: "Статистика", route: "/stats" },
			{ name: "Игры", route: "/apps" },
			{ name: "Добавить", route: "/add" },
			{ name: "Настройки", route: "/settings" }
		];
	}

	ngOnInit() {
		
	}
	

}

export interface MenuItem {
	name: string;
	route: string;
}
