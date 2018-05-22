import { Injectable } from "@angular/core";
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

export class User {
  name: string;
  email: string;
 
  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }
}

@Injectable()
export class AuthServiceProvider {

  data: any;
	message: "";
	currentUser: User;
	rootUrl: string = 'http://localhost:8080/api';

  constructor( 
		public jwtHelper: JwtHelperService,
		public _http: HttpClient,
		public http: Http
	) { }

	public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwtToken');
    return !this.jwtHelper.isTokenExpired(token);
	}
	
	// Register
/*   public register(credentials) {
    if (credentials.name === null || credentials.email === null || credentials.password === null) {
      return Observable.throw("Please insert credentials");
    } else {
      return Observable.create(observer => {
				this.http.post(`${this.rootUrl}/signup`, credentials)
        .map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });

        observer.next(true);
        observer.complete();
      });
    }
	} */
 
  public login(credentials) {
    if (credentials.email === null || credentials.password === null) {
      return Observable.throw("Пожалуйста введите данные");
    } else {
      return Observable.create(observer => {
        this._http.post(`${this.rootUrl}/signin`, { 
					email: credentials.email, password: credentials.password 
				}).subscribe(res => {
					this.data = res;
					localStorage.setItem('jwtToken', this.data.token);
					observer.next(true);
					observer.complete();
				}, err => {
					this.message = err;
					observer.next(false);
					observer.complete();
				});  
      });
    }
  }
 
  public register(credentials) {
    if (credentials.email.toLowerCase().trim() === null || credentials.password.trim() === null) {
      return Observable.throw("Пожалуйста введите данные");
    } else {
      return Observable.create(observer => {
        this.http.post(`${this.rootUrl}/signup`, {
					name: credentials.name.toLowerCase().trim(), fullname: credentials.fullname.toLowerCase().trim(),
					email: credentials.email.toLowerCase().trim(), password: credentials.password.trim(),
				})
        .map(res => res.json())
        .subscribe( data => {
          console.log(data);
        });
        observer.next(true);
        observer.complete();
      });
    }
  }
 
  public getUserInfo() : User {
    return this.currentUser;
  }
	
}