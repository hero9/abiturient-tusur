import { Component } from '@angular/core';
import { 
	IonicPage, 
	NavController, 
	NavParams, 
	AlertController, 
	LoadingController, 
	Loading,
	MenuController 
} from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth/auth-service';
import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	data: any;
	loading: Loading;
  registerCredentials = { email: '', password: '' };

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		private alertCtrl: AlertController,
		private menu: MenuController,
		private loadingCtrl: LoadingController
	) { }

	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

  createAccount() {
    this.navCtrl.push(RegisterPage);
	}
	
	public login() {
		this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {      
				this.navCtrl.setRoot( ProfilePage );
      } else {
				this.showError("Данные не правильны!");
      }
    },
      error => {
        this.showError(error);
      });
  }
	
	showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Подождите...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }
 
  showError(text) {
    this.loading.dismiss();
 
    let alert = this.alertCtrl.create({
      title: 'Ошибка',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(alert);
	}

}
