import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs/Observable";
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from "@angular/common/http";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
		const idToken = localStorage.getItem("jwtToken");
    const dupReq = req.clone({ 
			headers: req.headers.set("Authorization", 'Bearer ' + idToken)
		});
    return next.handle(dupReq);
  }
}
@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class InterceptorModule {}
