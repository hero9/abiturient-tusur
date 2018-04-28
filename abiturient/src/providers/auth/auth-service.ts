import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AuthServiceProvider {
  data: any;
  message: "";

  constructor( public jwtHelper: JwtHelperService ) {
    console.log("Hello AuthProvider Provider");
	}

	public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !this.jwtHelper.isTokenExpired(token);
  }
	
}