import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoCliente } from 'src/app/entidades/pago.cliente';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagoClienteService {

  constructor(private http: HttpClient) { }

  getPagoClientePorCuadreActivo(idCuadreCaja: number): Observable<PagoCliente[]> {
    return this.http.get<PagoCliente[]>
    (environment.urlEndPointApi+`/api-prestamos/lista-pagos-cuadre-activo/${idCuadreCaja}`);
  }

  eliminarPagoCLiente(idPagoCliente: number): Observable<void> {
    console.log(environment.urlEndPointApi+`/api-prestamos/pago-cliente/delete/${idPagoCliente}`);
    
    return this.http.delete<void>(environment.urlEndPointApi+`/api-prestamos/pago-cliente/delete/${idPagoCliente}`);
  }
}
