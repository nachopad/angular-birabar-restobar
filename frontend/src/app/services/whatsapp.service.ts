import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  public qrGenerado!:boolean;
  
  constructor(private _http: HttpClient) { 
    this.qrGenerado = false;
  }

  postIniciarSession():Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({

        }
      )
    };
    this.qrGenerado = true;
    return this._http.post("http://localhost:3000/api/whatsApp/iniciar", httpOptions);
  }

  enviarMensaje(numero:string, mensaje:string):Observable<any>{
    let httpOptions = {
      headers: new HttpHeaders({
        "Content-type":"application/json"
        }
      ), 
      params: new HttpParams()
    };
    
    const menssage = {
      'message': mensaje,
      'to':numero
    }
    
    console.log(menssage.message);
    
    let body = JSON.stringify(menssage);
    
    return this._http.post("http://localhost:3000/api/whatsApp/send", body, httpOptions);
  }



  


}
