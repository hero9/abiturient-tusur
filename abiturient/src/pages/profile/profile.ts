import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AuthServiceProvider } from './../../providers/auth/auth-service';
import { DomSanitizer } from '@angular/platform-browser';
import { LoginPage } from './../login/login';
import { EditProfilePage } from './edit-profile/edit-profile';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

	currentUser: Object;
	loading: any;

	ionViewCanEnter() {
    if (!this.auth.isAuthenticated()) {
			localStorage.removeItem("token");
			this.navCtrl.push( LoginPage );
    }
	}

  constructor(
		public navCtrl: NavController, 
		public navParams: NavParams,
		public auth: AuthServiceProvider,
		public loadingCtrl: LoadingController,
  	private sanitizer: DomSanitizer
	) {	}

	ionViewDidLoad() {
		this.getUser();
	}

	getUser() {
		this.showLoader("Loading...");
  	this.auth.getUser()
    .subscribe(data => {
      this.currentUser = {
        name: data.name,
				fullname: data.fullname,
				profileImage: this.sanitizer.bypassSecurityTrustResourceUrl(data.profileImage)
      };
      this.loading.dismiss();
    }, err => {
      console.log(err);
      this.loading.dismiss();
		});
	}

	showLoader(msg){
		this.loading = this.loadingCtrl.create({
				content: msg
		});
	
		this.loading.present();
	}

	editProfile() {
		this.navCtrl.push( EditProfilePage );
	}

}
