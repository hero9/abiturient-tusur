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
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: "page-register",
  templateUrl: "register.html"
})
export class RegisterPage {
	
	createSuccess = false;
	loading: any;
	registerCredentials = { profileImage:"", name: "", fullname: "", email: "", password: "" };
	imgPreview = 'assets/imgs/avatar.png';

  constructor(
    private navCtrl: NavController,
		private auth: AuthServiceProvider,
		private menu: MenuController,
		private alertCtrl: AlertController,
		private imagePicker: ImagePicker,
		private base64: Base64,
		public loadingCtrl: LoadingController,
	) { }
	
	ionViewDidEnter() {
		this.menu.swipeEnable(false);
	}
	
	getPhoto() {
		let options = {
			maximumImagesCount: 1
		};
		this.imagePicker.getPictures(options).then((results) => {
			for (var i = 0; i < results.length; i++) {
					this.imgPreview = results[i];
					this.base64.encodeFile(results[i]).then((base64File: string) => {
						this.registerCredentials.profileImage = base64File;
						console.log(`${base64File} hooop`);
					}, (err) => {
						console.log(err);
					});
			}
		}, (err) => { });
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
