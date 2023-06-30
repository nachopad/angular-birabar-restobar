import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { DetalleProducto } from '../models/detalle-producto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private _http: HttpClient) {
  }

  public createPedido(pedido:Pedido) : Observable<any>{
    return this._http.post('http://localhost:3000/api/pedido/', pedido);
  }

  public getPedidosEnCurso() : Observable<any>{
    return this._http.get('http://localhost:3000/api/pedido/filtrar?estado=Pendiente&estado=En curso');
  }

  public getPedidosFinalizados() : Observable<any>{
    return this._http.get('http://localhost:3000/api/pedido/filtrar?estado=Finalizado&estado=Cancelado');
  }

  public cancelarPedido(id:string) : Observable<any>{
    return this._http.delete('http://localhost:3000/api/pedido/eliminar/'+id);
  }

  public createDetalleProd(detalleProd: DetalleProducto){
    return this._http.post('http://localhost:3000/api/detalle-producto', detalleProd);
  }

  public getDetalle(id:String){
    return this._http.get('http://localhost:3000/api/detalle-producto/'+id);
  }
}
