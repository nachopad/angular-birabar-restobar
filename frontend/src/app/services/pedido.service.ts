import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';
import { DetalleProductoService } from './detalle-producto.service';
import { DetalleProducto } from '../models/detalle-producto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private _http: HttpClient) {
  }

  private getIdsDetalle(detProds: Array<DetalleProducto>): Array<string> {
    let ids = new Array<string>();
    detProds.forEach(d => {
      ids.push(d._id);
    });
    return ids;
  }

  public createPedido(pedido: Pedido): Observable<any> {
    let idsDetalles = this.getIdsDetalle(pedido.detalleProductos);
    const body = {
      ...pedido,
      'detalleProductos': idsDetalles,
    }
    return this._http.post('http://localhost:3000/api/pedido/', body);
  }

  public cancelarPedido(id: string): Observable<any> {
    return this._http.delete('http://localhost:3000/api/pedido/eliminar/' + id);
  }

  public getPedidosCliente(idCliente: string): Observable<any> {
    return this._http.get('http://localhost:3000/api/pedido/cliente/' + idCliente);
  }

  public getPedidoById(idPedido: string): Observable<any> {
    return this._http.get('http://localhost:3000/api/pedido/id/' + idPedido);
  }

  public editPedido(pedido: Pedido): Observable<any> {
    let idsDetalles = this.getIdsDetalle(pedido.detalleProductos);
    const body = {
      ...pedido,
      'detalleProductos': idsDetalles,
    }
    return this._http.put('http://localhost:3000/api/pedido/modificar/', body);
  }

  public getPedidos(): Observable<any> {
    return this._http.get('http://localhost:3000/api/pedido/all');
  }

  public getPedidosFiltrados(estado: string, idcliente:string, formaDePago: string):Observable<any>{
    return this._http.get('http://localhost:3000/api/pedido/filtrados?estado='+estado+'&cliente='+idcliente+'&formaDePago='+formaDePago);
  }
}
