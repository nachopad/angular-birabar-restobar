import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Categoria } from '../models/categoria';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _http: HttpClient) { }

  createCategoria(categoria: Categoria):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(categoria);
    return this._http.post("http://localhost:3000/api/categoria", body , httpOptions);
  }

  obtenerCategoria(id: string): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        
        }
      ), 
      params: new HttpParams()
        .set('id', id)
    };
    return this._http.get("http://localhost:3000/api/categoria/"+id, httpOptions);
  }

  updateCategoria(categoria: Categoria): Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    let body = JSON.stringify(categoria);
    return this._http.put("http://localhost:3000/api/categoria/update", body , httpOptions);
  }

  obtenerCategoriasDisponibles():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      ),
      params: new HttpParams()
    };
    return this._http.get("http://localhost:3000/api/categoria/", httpOptions);
  }
}
