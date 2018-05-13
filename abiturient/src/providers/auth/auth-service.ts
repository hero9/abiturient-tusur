/* import { HttpClient } from '@angular/common/http'; */
import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { Http } from '@angular/http';

@Injectable()
export class AuthServiceProvider {
  data: any;
  message: "";

  constructor( 
		public jwtHelper: JwtHelperService, 
		/* private _http: HttpClient, */
		public http: Http 
	) { }

	public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !this.jwtHelper.isTokenExpired(token);
	}
	
	// Register
  public register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {

        this.http.post("http://212.237.5.70:8080/api/signup", credentials)
        .map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });

        observer.next(true);
        observer.complete();
      });
    }
  }
	
}