import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from 'src/app/entidades/cliente';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entidad } from 'src/app/entidades/entidad';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  /**
   * Filtra por rutas
   * @param term 
   * @param idCartera 
   */
  filtrarClienteLikeByRuta(term:String, idCartera: number): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.urlEndPointApi + `/api-prestamos/clientes-activo-like-by-cartera/${term}/${idCartera}`);
  }

  /**
   * lista todos los clientes que contengan el parametro en los campos
   * nombres, apellidos e identificacion
   * @param term
   */
  filtrarClientesLike(term:String): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(environment.urlEndPointApi + `/api-prestamos/clientes-like/${term}`);
  }

  crearCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(environment.urlEndPointApi + '/api-prestamos/cliente',cliente);
  }

  editarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(environment.urlEndPointApi + `/api-prestamos/cliente/${cliente.id}`,cliente);
  }

  getClienteByNumeroIdentificacion(numeroIdentificacion: string): Observable<Cliente> {
    return this.http.get<Cliente>(environment.urlEndPointApi + `/api-prestamos/clientes/${numeroIdentificacion}`)
  }

  getEntidadByNumeroIdentificacion(numeroIdentificacion: string): Observable<Entidad> {
    return this.http.get<Entidad>(environment.urlEndPointApi + `/api-prestamos/entidad/${numeroIdentificacion}`)
  }
}
