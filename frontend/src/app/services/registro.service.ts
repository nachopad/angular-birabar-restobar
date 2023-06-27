import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  hostBaseUsuario: string;
  hostBaseCliente: string;
  hostBaseRol:string;

  constructor(private _http: HttpClient) {
    this.hostBaseUsuario = "http://localhost:3000/api/usuario/";
    this.hostBaseCliente = "http://localhost:3000/api/cliente/";
    this.hostBaseRol = "http://localhost:3000/api/rol/";
  }

  public registerUser(usuario: Usuario): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(usuario);
    console.log(body);
    return this._http.post(this.hostBaseUsuario + 'registro', body, httpOption);
  }

  public registerClient(cliente: Cliente): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify(cliente);
    console.log(body);
    return this._http.post(this.hostBaseCliente, body, httpOption);
  }

  getUsuarioById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBaseUsuario+"obtener-usuario/"+id, httpOptions);
  }

  getRolById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBaseRol+"obtener-rol/"+id, httpOptions);
  }


}
