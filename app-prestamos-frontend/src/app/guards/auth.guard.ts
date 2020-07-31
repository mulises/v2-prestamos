import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/login/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router){}
  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      let role = next.data['role'] as string;
      
      if(this.authService.isAuthenticated()) {
        if(this.authService.isTokenExpirado()) {
          this.authService.logout();
          this.router.navigate(['/login']);
          return true;
        }
        return true;
      }else{
        this.authService.logout();
        this.router.navigate(['/login']);
        return true;
      }    
  }

} 
