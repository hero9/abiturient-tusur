import { Input, Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { DataService } from "../../data.service";
import { froalaEditor } from "froala-editor";
import * as hash from "hash-string";


@Component({
	selector: "add-news",
	templateUrl: "./add-news.component.html",
})
export class AddNewsComponent implements OnInit {
	
	public alerts: Array<IAlert> = [];
  public showAlert: Boolean = false;
	news: any;
	public froalaContent: string = '';
	previewImage: any;
	labelText: string = "Загрузить изображение";

	edtContent($event : string){
		this.froalaContent = $event;
	}

  constructor(
    private http: HttpClient,
    private dataservice: DataService,
		private router: Router,
  ) {

    this.alerts.push({
      id: 1,
      type: "success",
      message: "Новость добавлена! Вы будете перенаправлены на страницу новостей..."
		});
		
	}

	previewFile() {
		let file = (document.querySelector('.upload_file') as HTMLInputElement).files[0]; 
		const fileReader: FileReader = new FileReader();
		this.labelText = file.name;

		fileReader.onloadend = (event : Event) => {
			let previewImage = fileReader.result;
			this.previewImage = previewImage;
		}
		fileReader.readAsDataURL(file);
	}

  saveNews(title, newsPreview) {
		this.dataservice.saveNews(hash(title), title, this.previewImage, newsPreview, this.froalaContent);
    this.http.get("/api/news").subscribe(data => {
			this.news = data;
			setTimeout(() => {
				this.router.navigate(['/news']);
			}, 3000);
		});
	}

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  onClickMe(){
    this.showAlert = true;
    setTimeout(
      function() {
        this.showAlert = false;
      }.bind(this),
      3000
		);
	}

  ngOnInit() {
    
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}
