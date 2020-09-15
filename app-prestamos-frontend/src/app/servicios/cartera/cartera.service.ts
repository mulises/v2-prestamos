import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartera } from 'src/app/entidades/cartera';
import { InfoGlobal } from 'src/app/entidades/interfaces/info-global';

@Injectable({
  providedIn: 'root'
})
export class CarteraService {

  constructor(private http: HttpClient) { }

  /* Lista las carteras asignadas a un usuario*/
  getCarterasIdNombreDescripcion(username:string):Observable<any> {
    return this.http.get<any>(environment.urlEndPointApi + '/api-prestamos/rutas-id-nombre/'+username)
  }

  getCarteraByIdSinListCliente(idCartera: number): Observable<Cartera> {
    return this.http.get<Cartera>(environment.urlEndPointApi + `/api-prestamos/cartera-sin-list-cliente/${idCartera}`)
  }

  getCarterasInfoGlobal(): Observable<InfoGlobal[]> {
    return this.http.get<InfoGlobal[]>(environment.urlEndPointApi + `/api-prestamos/informe-global-carteras`);
  }

  informePrestamosActivos(nombreArchivo: string,idCartera: number) {
    let REQUEST_PARAMS = new HttpParams().set('fileName',nombreArchivo)
    return this.http.get(environment.urlEndPointApi + `/api-prestamos/cartera/prestamosActivos/${idCartera}`,{
      params: REQUEST_PARAMS,
      responseType: 'arraybuffer'
    });
  }
}
