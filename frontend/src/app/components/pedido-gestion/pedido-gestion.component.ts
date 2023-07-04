import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-gestion',
  templateUrl: './pedido-gestion.component.html',
  styleUrls: ['./pedido-gestion.component.css']
})
export class PedidoGestionComponent implements OnInit {
  
  pedidos!:Array<Pedido>;
  estadoSeleccionado!:string;
  pedido!:Pedido;

  constructor(private pedidoService: PedidoService, private router: Router, 
              private toastrService:ToastrService) { 
    this.pedido = new Pedido();
    this.pedidos = new Array<Pedido>();
    this.traerPedidos();
  }

  ngOnInit(): void {
  }

  traerPedidos():void{
    let pedido;
    this.pedidoService.getPedidos().subscribe(
      (result: any[]) => {
        result.forEach(p => {
          pedido = new Pedido();
          Object.assign(pedido, p);
          this.pedidos.push(pedido);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelarPedido(idpedido:string):void{
    this.pedidoService.cancelarPedido(idpedido).subscribe(
      result => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  filtrarEstado(estado:string):void{
    let pedido;
    this.pedidoService.getPedidosByEstado(estado).subscribe(
      (result: any[]) => {
        this.pedidos = new Array<Pedido>();
        result.forEach(p => {
          pedido = new Pedido();
          Object.assign(pedido, p);
          this.pedidos.push(pedido);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  getPedido(pedido: Pedido){
    this.pedido = new Pedido();
    Object.assign(this.pedido, pedido);
  }

  modificarPedido(idpedido: string){
    this.router.navigate(['pedidos/gestion', idpedido]);
  }

  enviarWhatsapp(pedido:Pedido):void{

  }
}
