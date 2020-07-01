import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';
import {
   HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../servicios/login/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService, private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.

    return next.handle(req).pipe(
      catchError(e=>{
        if(e.status == 401){
          if(this.auth.isAuthenticated()){
            this.auth.logout();
          }
          this.router.navigate(['/login'])
        }
        return throwError(e);
      })
    );
  }
}
