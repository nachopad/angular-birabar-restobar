import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from 'src/app/models/oferta';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  accion!: string;
  buscarProducto: boolean = false;
  oferta!: Oferta;
  productos!: Array<Producto>;

  constructor(private rutaActiva: ActivatedRoute, private productoService: ProductoService, private toastrService: ToastrService) {
    this.productos = new Array<Producto>();
    this.cargarProductos();
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(params => {
      if (params['id'] == 0) {
        this.toastrService.info("Llene todos los campos para crear una oferta.");
        this.accion = "new";
        this.oferta = new Oferta();
        this.oferta.productos = new Array<Producto>();
      } else {
        /* Preguntar porque carajos no me funciona */
        this.toastrService.info("Modifique algunos campos y guarde los cambios para modificar la oferta.");
        this.accion = "update";
        this.oferta = new Oferta();
        this.oferta.productos = new Array<Producto>();
      }
    });
  }

  cargarProductos() {
    this.productoService.obtenerProductosDisponibles().subscribe(
      result => {
        result.forEach((element: any) => {
          let producto: Producto = new Producto();
          Object.assign(producto, element);
          this.productos.push(producto);
        });
      },
      error => {
        console.log("Error procesando la operacion");
      }
    );
  }

  agregarProductoToOferta(producto: Producto){
    this.toastrService.success("Producto agregado a la oferta.");
    this.oferta.productos.push(producto);
  }

  verProductosSeleccionados() {
    this.buscarProducto = false;
  }

  verTodosLosProductos() {
    this.buscarProducto = true;
  }

}
