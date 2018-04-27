import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';/* 
import { RestProvider } from '../../providers/rest/rest'; */
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	news: any;

  constructor(public navCtrl: NavController/* , public restProvider: RestProvider */) {
		/* this.restProvider.getNews()
			.subscribe(res => 
				this.news = res
			); */
	}
	login() {
		this.navCtrl.push(LoginPage);
	}
	
}


