import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cartera } from 'src/app/entidades/cartera';

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
}
