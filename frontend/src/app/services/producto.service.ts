import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Producto } from '../models/producto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private _http:HttpClient) { }

  registrarProducto(producto: Producto):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(producto);
    return this._http.post("http://localhost:3000/api/producto", body , httpOptions);
  }

  obtenerProducto(id: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get("http://localhost:3000/api/producto/obtener-producto/"+id, httpOptions);
  }

  actualizarProducto(producto: Producto): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(producto);
    return this._http.put("http://localhost:3000/api/categoria/edit", body , httpOptions);
  }

  obtenerProductosDisponibles():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
    };
    return this._http.get("http://localhost:3000/api/producto/", httpOptions);
  }
  
}
