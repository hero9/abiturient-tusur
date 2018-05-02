import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-froala',
  templateUrl: './froala.component.html',
  styleUrls: ['./froala.component.css']
})
export class FroalaComponent implements OnInit {

  constructor() { }

  ngOnInit() {
	}
	
	public options: Object = {

		charCounterCount: true,
		imageUploadURL: '/api/image_upload',
		imageUploadParams: {id: 'my_editor'},
		imageUploadMethod: 'POST',
		imageMaxSize: 5 * 1024 * 1024,
		imageAllowedTypes: ['jpeg', 'jpg', 'png'],
 
	};

}
