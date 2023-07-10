import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  hostBase: string;
  constructor(private _http: HttpClient) { 
    this.hostBase = "http://localhost:3000/api/cliente/";
  }

  obtenerCliente(userId: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.hostBase+"obtener-cliente/"+userId, httpOptions);
  }

  obtenerClientePorEmail(email: string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.hostBase+"obtener-cliente-email/"+email, httpOptions);
  }

  editCliente(cliente: Cliente):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(cliente);
    return this._http.put(this.hostBase+cliente._id, body , httpOptions);
  }

  obtenerClientesSuscriptos():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      ), 
      params: new HttpParams()
    };
    return this._http.get(this.hostBase+"obtener-clientes-suscripto", httpOptions);
  }
  
  obtenerClientes():Observable<any>{
    return this._http.get(this.hostBase);
  }
}
