import { Injectable } from "@angular/core";

@Injectable()
export class AuthServiceProvider {
  data: any;
  message: "";

  constructor() {
    console.log("Hello AuthProvider Provider");
	}
	
}