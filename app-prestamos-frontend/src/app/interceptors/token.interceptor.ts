import { Injectable } from '@angular/core';

import {
   HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';
import { AuthService } from '../servicios/login/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the auth token from the service.
    
    const authToken = this.auth.token;

    if(authToken != null){
      const authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authToken)
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}