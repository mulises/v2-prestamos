import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CuadreCaja } from 'src/app/entidades/cuadre.caja';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CuadreCajaService {

  constructor(private http: HttpClient) { }

  cuadreCajaActivo(idCartera: number): Observable<CuadreCaja> {
    return this.http.get<CuadreCaja>(environment.urlEndPointApi + `/api-prestamos/cuadaily/cuadre-activo-calc-resumen/${idCartera}`)    
  }

  crearCuadreCaja(cuadreCaja: CuadreCaja): Observable<CuadreCaja> {
    return this.http.post<CuadreCaja>(environment.urlEndPointApi + '/api-prestamos/cuadaily/cuadre-diario/',cuadreCaja);
  }

  actualizarCuadreCaja(cuadreCaja: CuadreCaja): Observable<CuadreCaja> {
    return this.http.put<CuadreCaja>(environment.urlEndPointApi + `/api-prestamos/cuadaily/cuadre-diario/${cuadreCaja.id}`,cuadreCaja);
  }

  descargar(nombreArchivo: string,idCuadre: number) {
    let REQUEST_PARAMS = new HttpParams().set('fileName',nombreArchivo)
    return this.http.get(environment.urlEndPointApi + "/api-prestamos/cuadaily/download/"+idCuadre,{
      params: REQUEST_PARAMS,
      responseType: 'arraybuffer'
    });
  }

  informeFlujoCaja(nombreArchivo: string,idCuadre: number, fechaInicio: Date, fechaFin: Date) {
    let REQUEST_PARAMS = new HttpParams().set('fileName',nombreArchivo)
    return this.http.get(environment.urlEndPointApi + `/api-prestamos/cuadaily/flujo-caja/${idCuadre}/${fechaInicio}/${fechaFin}`,{
      params: REQUEST_PARAMS,
      responseType: 'arraybuffer'
    });
  }
}
