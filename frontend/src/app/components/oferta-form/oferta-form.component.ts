import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from 'src/app/models/oferta';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ToastrService } from 'ngx-toastr';
import { OfertaService } from 'src/app/services/oferta.service';


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
  lunes: boolean = false;
  martes: boolean = false;
  miercoles: boolean = false;
  jueves: boolean = false;
  viernes: boolean = false;
  sabado: boolean = false;
  domingo: boolean = false;


  constructor(private rutaActiva: ActivatedRoute, private productoService: ProductoService, private toastrService: ToastrService, private ofertaService: OfertaService) {
    this.productos = new Array<Producto>();
    this.cargarProductos();
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(params => {
      if (params['id'] == 0) {
        this.toastrService.info("Complete todos los campos para crear una oferta.");
        this.accion = "new";
        this.oferta = new Oferta();
        this.oferta.productos = new Array<Producto>();
        this.oferta.dias = new Array<string>();
      } else {
        this.toastrService.info("Modifique algunos campos y guarde los cambios para modificar la oferta.");
        this.accion = "update";
        this.oferta = new Oferta();
        this.oferta.productos = new Array<Producto>();
      }
    });
  }

  crearOferta() {
    this.agregarDiasToOferta();
    this.ofertaService.registrarOferta(this.oferta).subscribe(
      result=>{
        this.toastrService.success("Oferta registrada correctamente");
      },
      error=>{
        this.toastrService.error("Error:", error);
      }
      );
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

  agregarProductoToOferta(producto: Producto) {
    this.toastrService.success("Producto agregado a la oferta.");
    this.oferta.productos.push(producto);
  }

  quitarProductoToOferta(producto: Producto) {
    var indice: number = this.oferta.productos.findIndex((prod) => prod._id == producto._id);
    this.toastrService.info("Producto quitado de la oferta.");
    this.oferta.productos.splice(indice, 1);
  }

  verificarCheboxes(): boolean {
    if (this.lunes || this.martes || this.miercoles || this.jueves || this.viernes || this.sabado || this.domingo) {
      return true;
    }
    return false;
  }

  private agregarDiasToOferta() {
    if (this.lunes == true) {
      this.oferta.dias.push("Lunes");
    }
    if (this.martes == true) {
      this.oferta.dias.push("Martes");
    }
    if (this.miercoles == true) {
      this.oferta.dias.push("Miercoles");
    }
    if (this.jueves == true) {
      this.oferta.dias.push("Jueves");
    }
    if (this.viernes == true) {
      this.oferta.dias.push("Viernes");
    }
    if (this.sabado == true) {
      this.oferta.dias.push("Sabado");
    }
    if (this.domingo == true) {
      this.oferta.dias.push("Domingo");
    }
  }

  onFileSeleccionado(event: any) {
    if (event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 70 * 1024) {
        event.target.value = null;
        this.toastrService.warning("La imagen no puede pesar más de 70KB.");
      } else {
        const reader = new FileReader();
        reader.onload = () => {
          this.oferta.imagen = reader.result as string;
        };
        reader.readAsDataURL(file);
      }
    }

  }
}
