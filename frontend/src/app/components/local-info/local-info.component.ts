import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { windowWhen } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-local-info',
  templateUrl: './local-info.component.html',
  styleUrls: ['./local-info.component.css']
})
export class LocalInfoComponent implements OnInit {
  deliveryStatus="Disponible";
  localStatus="Abierto";
  constructor(public loginService: LoginService, private webTitle: Title) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Contacto")
  }

  cambiarEstadoDelivery(){
    this.deliveryStatus = this.deliveryStatus === 'Disponible' ? 'No disponible' : 'Disponible';
  }

  cambiarEstadoLocal(){
    this.localStatus = this.localStatus === 'Abierto' ? 'Cerrado' : 'Abierto';
  }

}
