import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/oferta';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private _http: HttpClient) { }

  registrarOferta(oferta: Oferta): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }
      ),
      params: new HttpParams()
    };
    let body = JSON.stringify(oferta);
    console.log(body);
    return this._http.post("http://localhost:3000/api/oferta/crearOferta", body, httpOptions);
  }

  cargarOfertas(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.get("http://localhost:3000/api/oferta/", httpOptions);
  }

}
