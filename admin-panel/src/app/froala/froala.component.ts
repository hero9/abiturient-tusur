import { froalaEditor } from 'froala-editor';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';	

@Component({
  selector: 'app-froala',
  templateUrl: './froala.component.html',
  styleUrls: ['./froala.component.css']
})
export class FroalaComponent {

	@Output() editorContentChange = new EventEmitter<string>();
 
  constructor() { }

	onNameChange(froalaContent: string) {
		this.editorContentChange.emit(froalaContent);
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
