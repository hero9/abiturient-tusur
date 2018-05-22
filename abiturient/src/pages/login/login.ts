import { Component } from '@angular/core';
import { 
	IonicPage, 
	NavController, 
	NavParams, 
	AlertController, 
	LoadingController, 
	Loading 
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
		private loadingCtrl: LoadingController
	) {
  }

  public createAccount() {
    this.navCtrl.push( RegisterPage );
	}
	
	public login() {
		this.showLoading()
		console.log(this.registerCredentials);
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {      
				this.navCtrl.setRoot( ProfilePage );
      } else {
				this.showError("Данные не правильны!");
				console.log(allowed);
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
