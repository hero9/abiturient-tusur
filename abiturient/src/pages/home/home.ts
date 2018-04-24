import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	news: any;

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
		this.getNews();
	}
	
	getNews(){
		this.restProvider.getNews()
			.then( data => {
				this.news = data;
			})
	}

}
