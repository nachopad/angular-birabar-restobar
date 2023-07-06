import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(private _http: HttpClient) { }

  postIniciarSession():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      )
    };
    return this._http.post("http://localhost:3000/api/whatsApp/iniciar", httpOptions);
  }

}
