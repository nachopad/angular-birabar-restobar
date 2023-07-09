import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Pedido } from 'src/app/models/pedido';
import { ClienteService } from 'src/app/services/cliente.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-pedido-gestion',
  templateUrl: './pedido-gestion.component.html',
  styleUrls: ['./pedido-gestion.component.css']
})
export class PedidoGestionComponent implements OnInit {

  pedidos!: Array<Pedido>;
  estadoSeleccionado!: string;
  formadepagoSeleccionada!: string;
  idclienteSeleccionado!: string;
  pedido!: Pedido;
  clientes!: Array<Cliente>;

  pedidoS!: Pedido;

  constructor(private pedidoService: PedidoService, private router: Router,
    private toastrService: ToastrService, private clienteService: ClienteService,
    private ventaService: VentaService) {
    this.estadoSeleccionado = "";
    this.formadepagoSeleccionada = "";
    this.idclienteSeleccionado = "";
    this.pedido = new Pedido();
    this.pedidos = new Array<Pedido>();
    this.traerPedidos();
    this.traerClientes();
  }

  ngOnInit(): void {
  }

  traerPedidos(): void {
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

  cancelarPedido(idpedido: string): void {
    this.pedidoService.cancelarPedido(idpedido).subscribe(
      result => {
        location.reload();
      },
      error => {
        console.log(error);
      }
    );
  }

  filtrarPedidos(estado: string, idcliente: string, formaDePago: string): void {
    let pedido;
    this.pedidoService.getPedidosFiltrados(estado, idcliente, formaDePago).subscribe(
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

  setPedido(pedido: Pedido) {
    this.pedido = new Pedido();
    Object.assign(this.pedido, pedido);
  }

  modificarPedido(idpedido: string) {
    this.router.navigate(['pedidos/gestion', idpedido]);
  }

  enviarWhatsapp(pedido: Pedido): void {

  }

  traerClientes(): void {
    this.clientes = new Array<Cliente>();
    let cliente;
    this.clienteService.obtenerClientes().subscribe(
      (result: any[]) => {
        result.forEach(c => {
          cliente = new Cliente();
          Object.assign(cliente, c);
          this.clientes.push(cliente);
        });
      },
      error => {
        console.log(error);
      }
    );
  }

  async getPedido(idpedido: string) {
    const result = await this.pedidoService.getPedidoById(idpedido).toPromise();
    this.pedidoS = new Pedido();
    Object.assign(this.pedidoS, result);
  }

  async aceptarPedido(idpedido: string) {
    await this.getPedido(idpedido);
    this.pedidoS.estado = "En curso";
    this.pedidoService.editPedido(this.pedidoS).subscribe(
      (result) => {
        location.reload();
      }
    );
  }

  async finalizarPedido(idpedido: string) {
    await this.getPedido(idpedido);
    this.pedidoS.estado = "Finalizado";
    this.pedidoService.editPedido(this.pedidoS).subscribe(
      (result) => {
        let fecha = new Date();
        let fechaFormateada = fecha.toISOString().slice(0, 10);
        this.ventaService.guardarVenta(fechaFormateada, this.pedidoS._id).subscribe(
          (result) => {
            this.toastrService.success('Se guardó una nueva venta: ' + result.venta._id);
            location.reload();
          }
        );
      }
    );
  }
}
