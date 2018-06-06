import { LoginPage } from './../login/login';
import { Component } from "@angular/core";
import { 
	NavController,
	AlertController,
	IonicPage,
	MenuController,
	LoadingController
} from "ionic-angular";
import { AuthServiceProvider } from "./../../providers/auth/auth-service";

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
	
	createSuccess = false;
	loading: any;
	registerCredentials = { name: "", fullname: "", email: "", password: "" };

  constructor(
    private navCtrl: NavController,
		private auth: AuthServiceProvider,
		private menu: MenuController,
		private alertCtrl: AlertController,
		public loadingCtrl: LoadingController,
	) { }
	
	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}

	showLoader(){
		this.loading = this.loadingCtrl.create({
				content: 'Submitting...'
		});
	
		this.loading.present();
	}

  public register() {
    this.auth.register(this.registerCredentials).subscribe(
      success => {
        if (success) {
          this.createSuccess = true;
          this.showPopup("Успешно", "Аккаунт создан.");
        } else {
          this.showPopup("Ошибка", "Возникла ошибка при создании аккаунта.");
        }
      },
      error => {
        this.showPopup("Ошибка", error);
      }
    );
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
              this.navCtrl.push( LoginPage );
            }
          }
        }
      ]
    });
    alert.present();
  }
}
