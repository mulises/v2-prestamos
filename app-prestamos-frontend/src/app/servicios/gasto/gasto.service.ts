import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Gasto } from 'src/app/entidades/gasto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GastoService {

  constructor(private http: HttpClient) { }

  crearGasto(gasto: Gasto): Observable<any> {
    return this.http.post<any>(environment.urlEndPointApi+'/api-prestamos/gasto/save',gasto);
  }
  
  actualizarGasto(gasto: Gasto): Observable<any> {
    return this.http.put<any>(environment.urlEndPointApi+'/api-prestamos/gasto/update',gasto);
  }

  listaGastoByCuadre(idCartera: number): Observable<Gasto[]> {
    return this.http.get<Gasto[]>(environment.urlEndPointApi + `/api-prestamos/gasto/listar-gastos-cartera/${idCartera}`);
  }

  eliminarGasto(idGasto: number): Observable<void> {
    return this.http.delete<void>(environment.urlEndPointApi + `/api-prestamos/gasto/${idGasto}`)
  }
}
