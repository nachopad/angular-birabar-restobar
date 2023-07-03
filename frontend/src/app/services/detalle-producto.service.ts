import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetalleProductoService {

  constructor(private _http: HttpClient) { }

  public createDetalleProd(cantidad:number, idproducto:string, subtotal:number): Observable<any>{
    const body = {
      'cantidad': cantidad,
      'producto': idproducto,
      'subtotal': subtotal
    }
    return this._http.post('http://localhost:3000/api/detalle-producto', body);
  }

  public getDetalle(id:String): Observable<any>{
    return this._http.get('http://localhost:3000/api/detalle-producto/'+id);
  }
}
