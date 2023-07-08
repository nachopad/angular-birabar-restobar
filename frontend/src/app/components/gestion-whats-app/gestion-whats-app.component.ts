import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { WhatsappService } from 'src/app/services/whatsapp.service';

@Component({
  selector: 'app-gestion-whats-app',
  templateUrl: './gestion-whats-app.component.html',
  styleUrls: ['./gestion-whats-app.component.css']
})
export class GestionWhatsAppComponent implements OnInit {

  qr!:any;
  generandoQR: boolean = false;
  generado: boolean = false;
  
  constructor(private whatsAppService:WhatsappService, private webTitle: Title) { }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion WhatssApp");
  }

  async generarQR() {
    this.generandoQR = true;
    try {
      const result = await this.whatsAppService.postIniciarSession().toPromise();
      this.qr = result;
    } catch (error) {
      alert("Error al generar el código QR.");
    }
    this.generandoQR = false;
    this.generado = true;
  }

}
