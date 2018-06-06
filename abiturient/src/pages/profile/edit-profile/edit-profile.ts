import { Component } from '@angular/core';
import { IonicPage, NavController, MenuController, AlertController, LoadingController } from 'ionic-angular';
import { ProfilePage } from './../profile';
import { AuthServiceProvider } from '../../../providers/auth/auth-service';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {

	currentUser: Object;
  createSuccess = false;
	loading: any;
	updateDataCredentials = { email: "", password: "" };
	message: string;

  constructor(
    private navCtrl: NavController,
		public auth: AuthServiceProvider,
		private menu: MenuController,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
		private _http: HttpClient,
	) { }
	
	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	ionViewDidLoad() {
		this.getUser();
	}

	getUser() {
  	this.auth.getUser()
    .subscribe(data => {
      this.currentUser = {
        name: data.name,
				fullname: data.fullname
      };
    }, err => {
      console.log(err);
		});
	}

	showLoader(){
		this.loading = this.loadingCtrl.create({
				content: 'Submitting...'
		});
	
		this.loading.present();
	}

  public updateData() {
		this._http.put(`${this.auth.rootUrl}/user`, {
			email: this.updateDataCredentials.email.toLowerCase().trim(), password: this.updateDataCredentials.password.trim(),
		})
		.subscribe(res => {
			this.showPopup("Успешно", "Изменения внесены");
			this.navCtrl.push( ProfilePage );
		}, err => {
			this.showPopup("Ошибка", err);
		});
  }

  showPopup(title, text) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: text,
      buttons: [
        {
          text: "OK",
          handler: data => {
            if (this.createSuccess) {
              this.navCtrl.push( ProfilePage );
            }
          }
        }
      ]
    });
    alert.present();
	}
	
}
