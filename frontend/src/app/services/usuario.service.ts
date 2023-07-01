import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  hostBase: string;

  constructor(private _http: HttpClient) {
    this.hostBase = "http://localhost:3000/api/usuario/";
   }

   getUsuarios():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase, httpOptions);
   }

   getUsuarioById(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase+"obtener-usuario/"+id, httpOptions);
  }

  deleteUsuario(id:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    };
    return this._http.delete(this.hostBase+id, httpOptions);
  }

  editUsuario(usuario: Usuario):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(usuario);
    return this._http.put(this.hostBase+usuario._id, body , httpOptions);
  }
}
