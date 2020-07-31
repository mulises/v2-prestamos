import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Prestamo } from 'src/app/entidades/prestamo';
import { PagoCliente } from 'src/app/entidades/pago.cliente';

@Injectable({
  providedIn: 'root'
})
export class CreditoService {

  constructor(private http: HttpClient) { }

  getCreditosActivoByCartera(idCartera: number):Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(environment.urlEndPointApi + '/prestamo/prestamos-activo-ruta/'+idCartera);
  }

  getCreditosParaCobroByCartera(idCartera: number): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(environment.urlEndPointApi + `/prestamo/prestamos-para-cobro/${idCartera}`);
  }

  //este metodo debe ser cambiado de clase
  generarPagoCliente(pagoCliente:PagoCliente): Observable<any> {
    return this.http.post<any>(environment.urlEndPointApi + '/api-prestamos/pago-cliente',pagoCliente);
  }

  generarCredito(credito: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(environment.urlEndPointApi + '/prestamo/prestamo',credito);
  }

  ampliarCredito(idCreditoAnterior:number, credito: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(environment.urlEndPointApi + `/prestamo/ampliar-credito/${idCreditoAnterior}`,credito);
  }

}
