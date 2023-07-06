import { Component, OnInit } from '@angular/core';
import { WhatsappService } from 'src/app/services/whatsapp.service';

@Component({
  selector: 'app-gestion-whats-app',
  templateUrl: './gestion-whats-app.component.html',
  styleUrls: ['./gestion-whats-app.component.css']
})
export class GestionWhatsAppComponent implements OnInit {

  qr!:any;
  
  constructor(private whatsAppService:WhatsappService) { }

  ngOnInit(): void {
  }

  async iniciarSescion(){
    
    await this.whatsAppService.postIniciarSession().subscribe(
      (result)=>{
        console.log(result);
        this.qr=result;
        console.log(this.qr);
      },
      error=>{alert("Error");}
    )
  }

}
