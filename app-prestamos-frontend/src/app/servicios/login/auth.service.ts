import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Usuario } from '../../entidades/usuario';
import { CuadreCaja } from 'src/app/entidades/cuadre.caja';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;
  private _codigoEmpresa: string;

  constructor(private http: HttpClient) { }

  login(usuario: Usuario): Observable<any> {
    const credenciales = btoa('frontend-angular'+':'+'12345');

    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded',
    'Authorization':'Basic '+credenciales});

    let params = new URLSearchParams();

    params.set('grant_type','password');
    params.set('username',usuario.username);
    params.set('password',usuario.password);

    return this.http.post<any>(environment.urlEnpointToken,params.toString(),{headers:httpHeaders})
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this._usuario = new Usuario();
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    //sessionStorage.setItem('usuario',JSON.stringify(this._usuario));
    localStorage.setItem('usuario',JSON.stringify(this._usuario));
  }

  guardarCodigoEmpresa(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    localStorage.setItem('codigo_empresa',payload.codigo_empresa);
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    //sessionStorage.setItem('token',accessToken);
    localStorage.setItem('token',accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if(accessToken != null ){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;

  }

  public get token(): string{
    if(this._token != null){
      return this._token;
    }else if(this._token == null && localStorage.getItem('token') != null) {
      //this._token = sessionStorage.getItem('token');
      this._token = localStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  public get usuario(): Usuario{
    if(this._usuario != null){
      return this._usuario;
    }else if(this._usuario == null && localStorage.getItem('usuario') != null) {
      //this._token = sessionStorage.getItem('token');
      this._usuario = JSON.parse(localStorage.getItem('usuario'));
      return this._usuario;
    }
    return null;
  }

  public get codigoEmpresa(): string{
    if(this._codigoEmpresa != null){
      return this._codigoEmpresa;
    }else if(this._codigoEmpresa == null && localStorage.getItem('codigo_empresa') != null) {
      //this._token = sessionStorage.getItem('token');
      this._usuario = JSON.parse(localStorage.getItem('codigo_empresa'));
      return this._codigoEmpresa;
    }
    return null;
  }

  isTokenExpirado(): boolean {
    let token = this.token;

    let payLoad = this.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if(payLoad.exp < now) {
      return true;
    }
    return false;
  }

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);

    if(payload != null && payload.user_name && payload.user_name.length>0){
      if(this.isTokenExpirado()) {
        return false;
      }
      return true;
    }
    return false;
  }

  logout(): void{
    this._token = null;
    this._usuario = null;
    this._codigoEmpresa = null;
    localStorage.clear()
    sessionStorage.clear();
  }

  hasRole(role:string): boolean {

    if(this.usuario==null) {
      return false;
    }

    if (!(Array.isArray(this.usuario.roles) && this.usuario.roles.length)) {
      return false;
    }

    if(this.usuario.roles.includes(role)) {
      return true;
    }
    return false;
  }

  /**
   * Retorna el cuadre de caja activo para una cartera
   * @param idCartera 
   */
  existeCuadreactivo(idCartera: number):  Observable<CuadreCaja> {
    return this.http.get<CuadreCaja>(environment.urlEndPointApi + `/api-prestamos/cuadaily/cuadre-activo-cartera/${idCartera}`);  
  }
  
}
