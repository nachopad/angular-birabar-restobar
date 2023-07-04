import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';

@Component({
  selector: 'app-pedido-gestion-form',
  templateUrl: './pedido-gestion-form.component.html',
  styleUrls: ['./pedido-gestion-form.component.css']
})
export class PedidoGestionFormComponent implements OnInit {

  idpedido!:string;
  pedido!:Pedido;

  constructor(private router:Router, private activatedRoute:ActivatedRoute,
              private pedidoService:PedidoService, private toastrService:ToastrService) { 
    this.pedido = new Pedido();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.idpedido = params['id'];
      this.traerPedido(this.idpedido);
    });
  }

  volver():void{
    this.router.navigate(['pedidos/gestion']);
  }

  traerPedido(id:string){
    this.pedido = new Pedido();
    this.pedidoService.getPedidoById(id).subscribe(
      (result) => {
        Object.assign(this.pedido, result);
      },
      error => {
        console.log(error);
      }
    );
  }

  modificarPedido():void{
    this.pedidoService.editPedido(this.pedido).subscribe(
      (result) => {
        this.toastrService.success('Se modificó el pedido: '+this.pedido._id);
        this.router.navigate(['pedidos/gestion']);
      },
      error => {
        console.log(error);
      }
    );
  }

}
