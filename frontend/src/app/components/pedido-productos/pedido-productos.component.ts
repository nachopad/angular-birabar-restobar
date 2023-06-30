import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/services/pedido.service';
import { DetalleProducto } from 'src/app/models/detalle-producto';

@Component({
  selector: 'app-pedido-productos',
  templateUrl: './pedido-productos.component.html',
  styleUrls: ['./pedido-productos.component.css']
})
export class PedidoProductosComponent implements OnInit {

  productos!: Array<Producto>;
  modalidad!: string;
  pedidoProductos!: Array<Producto>;
  cliente!: Cliente;
  pedido!: Pedido;

  detalleProductos!: Array<DetalleProducto>;

  constructor(private webTitle: Title, private productoService: ProductoService,
    private activatedRoute: ActivatedRoute, public loginService: LoginService,
    private toastrService: ToastrService, private pedidoService: PedidoService,
    private router: Router) {
    this.productos = new Array<Producto>();
    this.detalleProductos = new Array<DetalleProducto>();
    this.pedidoProductos = new Array<Producto>();
    this.getCliente();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Seleccionar Productos");

    this.activatedRoute.params.subscribe(params => {
      this.modalidad = params['modalidad'];
      this.cargarProductos();
    });
  }

  cargarProductos() {
    let producto: Producto;
    this.productoService.obtenerProductosDisponibles().subscribe(
      (result: any[]) => {
        result.forEach(e => {
          producto = new Producto();
          Object.assign(producto, e);
          this.productos.push(producto);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

agregarAlPedido(producto: Producto) {
  let detalle = new DetalleProducto();
  if (this.detalleProductos.length == 0) {
      detalle.producto = producto;
      detalle.cantidad = 1;
      this.detalleProductos.push(detalle);
  } else {
      const existingDetalle = this.detalleProductos.find(detalle => detalle.producto._id === producto._id);
      if (existingDetalle) {
        existingDetalle.cantidad++;
      } else {
        detalle.producto = producto;
        detalle.cantidad = 1;
        this.detalleProductos.push(detalle);
      }
  }
  this.toastrService.success("Producto agregado al pedido.");
}

quitarDelPedido(producto: Producto) {
  const existingDetalle = this.detalleProductos.find(detalle => detalle.producto._id === producto._id);
  if (existingDetalle && existingDetalle.cantidad > 1) {
    existingDetalle.cantidad--;
    this.toastrService.error("Producto eliminado del pedido.");
  }else{
    if (existingDetalle && existingDetalle.cantidad == 1){
      const index = this.detalleProductos.findIndex(d => d.producto._id == producto._id);
      this.detalleProductos.splice(index, 1);
      this.toastrService.error("Producto eliminado del pedido.");
    }
  }
}

calcularCantidad(idProd: string): number {
  const detalle = this.detalleProductos.find(detalle => detalle.producto._id === idProd);
  if (detalle) {
    return detalle.cantidad;
  } else {
    return 0;
  }
}

getCliente(): void {
  if(this.loginService.userLoggedIn()) {
    let idUser = this.loginService.idLogged();
    this.loginService.getClientes().subscribe(
      (result: any[]) => {
        result.forEach(e => {
          if (e.usuario._id == idUser) {
            this.cliente = new Cliente();
            Object.assign(this.cliente, e);
          }
        });
      },
      error => {
        console.log(error);
      }
    );
  }
}

guardarDetalles():void {
  this.detalleProductos.forEach(d => {
    this.pedidoService.createDetalleProd(d).subscribe(
      (result) => {
        Object.assign(d, result);
      },
      error => {
        console.log(error);
      }
    );
  });
}

guardarPedido() {
  this.pedido = new Pedido();
  this.pedido.cliente = this.cliente;
  this.pedido.demora = "45:00";
  this.pedido.estado = "Pendiente";
  this.pedido.modalidad = this.modalidad;
  this.guardarDetalles();

  let array = new Array<string>();
  this.detalleProductos.forEach(d => {
    array.push(d._id);
  });

  this.pedido.detalleproductos=array;

  this.pedidoService.createPedido(this.pedido).subscribe(
    (result) => {
      this.toastrService.success("Pedido enviado.");
      this.router.navigate(['mis-pedidos']);
      console.log(result);
    },
    error => {
      console.log(error);
    }
  );
}

calcularTotal(): number {
  let total = 0;
  this.detalleProductos.forEach(d => {
    total = d.producto.precio * d.cantidad + total;
  });
  return total;
}

}
