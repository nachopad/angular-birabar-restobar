import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductoService } from 'src/app/services/producto.service';
import { Producto } from 'src/app/models/producto';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Cliente } from 'src/app/models/cliente';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from 'src/app/services/pedido.service';
import { DetalleProducto } from 'src/app/models/detalle-producto';
import { DetalleProductoService } from 'src/app/services/detalle-producto.service';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-pedido-productos',
  templateUrl: './pedido-productos.component.html',
  styleUrls: ['./pedido-productos.component.css']
})
export class PedidoProductosComponent implements OnInit {

  productos!: Array<Producto>;
  modalidad!: string;
  cliente!: Cliente;
  detalleProductos!: Array<DetalleProducto>;
  arrayIds!: Array<string>;
  pedido!: Pedido;
  formaDePago!:string;

  constructor(private webTitle: Title, private productoService: ProductoService,
    private activatedRoute: ActivatedRoute, public loginService: LoginService,
    private toastrService: ToastrService, private pedidoService: PedidoService,
    private router: Router, private detProdService: DetalleProductoService,
    private clienteService: ClienteService) {
    this.productos = new Array<Producto>();
    this.detalleProductos = new Array<DetalleProducto>();
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
    const existingDetalle = this.detalleProductos.find(detalle => detalle.producto._id === producto._id);
    if (existingDetalle) {
      existingDetalle.cantidad++;
      existingDetalle.subtotal = existingDetalle.producto.precio * existingDetalle.cantidad;
    } else {
      detalle.producto = producto;
      detalle.cantidad = 1;
      detalle.subtotal = producto.precio;
      this.detalleProductos.push(detalle);
    }
    this.toastrService.success("Producto agregado al pedido.");
  }

  quitarDelPedido(producto: Producto) {
    const existingDetalle = this.detalleProductos.find(detalle => detalle.producto._id === producto._id);
    if (existingDetalle && existingDetalle.cantidad > 1) {
      existingDetalle.cantidad--;
      existingDetalle.subtotal = existingDetalle.producto.precio * existingDetalle.cantidad;
      this.toastrService.error("Producto eliminado del pedido.");
    } else {
      if (existingDetalle && existingDetalle.cantidad == 1) {
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
    if (this.loginService.userLoggedIn()) {
      let idUser = this.loginService.idLogged();
      if (idUser != null) {
        this.clienteService.obtenerCliente(idUser).subscribe(
          (result) => {
            this.cliente = new Cliente();
            Object.assign(this.cliente, result);
          },
          error => {
            console.log(error);
          }
        );
      }
    }
  }

  crearPedido(){
    this.pedido = new Pedido();
    this.pedido.cliente = this.cliente;
    this.pedido.demora = "45 min";
    this.pedido.detalleProductos = this.detalleProductos;
    this.pedido.estado = "Pendiente";
    this.pedido.modalidad = this.modalidad;
    this.pedido.total = this.calcularTotal();
    this.pedido.formaDePago = this.formaDePago;
  }

  guardarPedido() {
    let contador = 1;
    this.detalleProductos.forEach(d => {
      this.detProdService.createDetalleProd(d.cantidad, d.producto._id, d.subtotal).subscribe(
        (resultD) => {
          d._id = resultD._id;
          if (contador == this.detalleProductos.length){
            this.crearPedido();
            this.pedidoService.createPedido(this.pedido).subscribe(
              (resultP) => {
                this.pedido._id = resultP.pedido._id;
                this.toastrService.success("Pedido enviado.");
                this.router.navigate(['mis-pedidos']);
              },
              error => {
                console.log(error);
              }
            );
          }else{
            contador++;
          }
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  calcularTotal(): number {
    let total = 0;
    this.detalleProductos.forEach(d => {
      total = d.subtotal + total;
    });
    return total;
  }

}
