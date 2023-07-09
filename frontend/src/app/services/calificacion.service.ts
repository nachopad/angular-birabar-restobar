import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Calificacion } from '../models/calificacion';

@Injectable({
  providedIn: 'root'
})
export class CalificacionService {

  constructor(private _http: HttpClient) { }

  public guardarCalificacion(calificacion:Calificacion):Observable<any>{
    return this._http.post('http://localhost:3000/api/calificacion/',calificacion);
  }
  public obtenerCalificaciones():Observable<any>{
    return this._http.get('http://localhost:3000/api/calificacion/');
  }
  public obtenerResumen():Observable<any>{
    return this._http.get('http://localhost:3000/api/calificacion/resumen');
  }
}
