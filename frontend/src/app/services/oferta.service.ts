import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Oferta } from '../models/oferta';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private _http: HttpClient, private loginService:LoginService) { }

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
    return this._http.post(this.loginService.hostServe+"oferta/crearOferta", body, httpOptions);
  }

  modificarOferta(oferta: Oferta): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }
      ),
      params: new HttpParams()
    };
    let body = JSON.stringify(oferta);
    console.log(body);
    return this._http.put(this.loginService.hostServe+"oferta/editarOferta", body, httpOptions);
  }

  cargarOfertas(): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe+"oferta/", httpOptions);
  }

  obtenerOferta(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.get(this.loginService.hostServe+"oferta/buscarOferta/" + id, httpOptions);
  }

  borrarOferta(id: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
      }
      ),
      params: new HttpParams()
    };
    return this._http.delete(this.loginService.hostServe+"oferta/borrarOferta/"+ id, httpOptions);
  }

}
