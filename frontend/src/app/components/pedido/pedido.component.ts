import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Title } from '@angular/platform-browser';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { Observable } from 'rxjs';
import { PedidoService } from 'src/app/services/pedido.service';
import { ToastrService } from 'ngx-toastr';
import { DetalleProducto } from 'src/app/models/detalle-producto';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  navSelected=true;
  pedidosEnCurso!: Array<Pedido>;
  pedidosFinalizados!: Array<Pedido>;
  detalleProductos!: Array<DetalleProducto>

  constructor(private router: Router, private webTitle: Title,
              private pedidoService: PedidoService, private toastrService: ToastrService) {
    this.traerPedidosEnCurso();
    this.traerPedidosFinalizados();
    this.detalleProductos = new Array<DetalleProducto>();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Pedidos");
  }

  tabActiva(tab:string){
    if (tab == "En curso" ){
      this.navSelected=true;
    }else{
      this.navSelected=false;
    }
  }

  setModalidad(modalidad:string){
    this.router.navigate(["mis-pedidos/productos/", modalidad]);
  }

  traerPedidosEnCurso(): void{
    this.pedidosEnCurso = new Array<Pedido>();
    let pedido;
    this.pedidoService.getPedidosEnCurso().subscribe(
      (result: any[]) => {
        result.forEach(e => {
          pedido = new Pedido();
          Object.assign(pedido, e);
          this.pedidosEnCurso.push(pedido);
        });
      },
      error => {
        console.log(error);
      }
     );
  }

  traerPedidosFinalizados(): void{
    this.pedidosFinalizados = new Array<Pedido>();
    let pedido;
    this.pedidoService.getPedidosFinalizados().subscribe(
      (result: any[]) => {
        result.forEach(e => {
          pedido = new Pedido();
          Object.assign(pedido, e);
          this.pedidosFinalizados.push(pedido);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  cancelarPedido(pedido:Pedido){
    this.pedidoService.cancelarPedido(pedido._id).subscribe(
      (result) => {
        this.toastrService.info("Se canceló el pedido, podes ver el estado en 'Finalizados'.");
        this.traerPedidosEnCurso();
        this.traerPedidosFinalizados();
      },
      error => {
        console.log(error);
      }
    );
  }

  traerDetalles():void {
    let detalle;
    this.pedidosEnCurso.forEach(p => {
      p.detalleproductos.forEach(d => {
        this.pedidoService.getDetalle(d).subscribe(
          (result) => {
            detalle = new DetalleProducto();
            Object.assign(detalle, result);
            this.detalleProductos.push(detalle);
          },
          error => {
            console.log(error);
          }
        );
      });
    });
  }

}
