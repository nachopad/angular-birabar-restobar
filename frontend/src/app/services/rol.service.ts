import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  hostBase: string;
  constructor(private _http: HttpClient) { 
    this.hostBase = "http://localhost:3000/api/rol/";
  }

  getRoles():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase, httpOptions);
  }

  getRolByName(nombre:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
      }),
      params: new HttpParams()
    }
    return this._http.get(this.hostBase+"obtener-rol-por-nombre/"+nombre, httpOptions);
  }
  
}
