import { Injectable } from '@angular/core';
import { Venta } from '../models/venta';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VentaService {

  url!:string;
  constructor(private _http: HttpClient) { 
    this.url = 'http://localhost:3000/api/venta/';
  }

  public guardarVenta(fecha:string, idpedido:string) : Observable<any>{
    const body = {
      'fecha': fecha,
      'pedido': idpedido
    }
    return this._http.post(this.url, body);
  }

  public getVentas() : Observable<any>{
    return this._http.get(this.url+'all');
  }

  public getVentasFiltradas(fechaDesde:string, fechaHasta:string, idusuario:string) : Observable<any> {
    return this._http.get(this.url+'filtrar/ventas'+'?fechaDesde='+fechaDesde+'&fechaHasta='+fechaHasta+'&usuario='+idusuario);
  }
}
