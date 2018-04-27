import { Component, OnInit } from "@angular/core";
import { DataService } from "../../data.service";
import { froalaEditor } from "froala-editor";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroupDirective, NgForm, FormGroup, Validators } from '@angular/forms';
declare let $: any;

@Component({
  selector: "app-edit-news",
  templateUrl: "./edit-news.component.html",
  styleUrls: ["./edit-news.component.css"]
})
export class EditNewsComponent implements OnInit {
  editNews: any;
  public alerts: Array<IAlert> = [];
	public showAlert: Boolean = false;
	editorContent : any;
	flagForm: FormGroup;

	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
		const isSubmitted = form && form.submitted;
		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
	}

  constructor(private _http: HttpClient, private _data: DataService) {
    this.alerts.push({
      id: 1,
      type: "success",
      message: "Новость перезаписана!"
    });
  }

  public closeAlert(alert: IAlert) {
    const index: number = this.alerts.indexOf(alert);
    this.alerts.splice(index, 1);
  }

  onClickMe() {
    this.showAlert = true;
    setTimeout(
      function() {
        this.showAlert = false;
      }.bind(this),
      3000
    );
	}

  ngOnInit() {
    this._http.get(`/api/news/${this._data.editNewsID}`).subscribe(data => {
			this.editNews = data;
			this.editorContent = this.editNews.newsText;
		});		
	}

  updateNews(title, newsPreview, newsText) {
    this._http
      .put(`/api/news/${this._data.editNewsID}`, {
        title: title,
        newsPreview: newsPreview,
        newsText: newsText
      })
      .subscribe(
        res => {
          let id = res["id"];
        },
        err => {
          console.log(err);
        }
      );
  }
}

export interface IAlert {
  id: number;
  type: string;
  message: string;
}