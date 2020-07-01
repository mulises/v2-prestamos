import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../servicios/login/auth.service';
import Swal from 'sweetalert2';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidarCuadreActivoGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router,private activatedRoute: ActivatedRoute){}
  canActivate(
  next: ActivatedRouteSnapshot,
  state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.existeCuadreactivo(next.params.idCartera)
    .pipe(
      map( response => true),
      catchError(e => { Swal.fire('No existe Cuadre Activo', 'Contacte a su supervisor', 'error');; return of(false)})
    );

  }

  private validarCuadre(idCartera: number): Observable<boolean> {
    return this.authService.existeCuadreactivo(idCartera)
    .pipe(
      map( response => true),
      catchError(e => of(false))
    );
  }
} 
