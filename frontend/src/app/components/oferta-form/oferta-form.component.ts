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
  oferta: Oferta;
  productos!: Array<Producto>;
  lunes: boolean = false;
  martes: boolean = false;
  miercoles: boolean = false;
  jueves: boolean = false;
  viernes: boolean = false;
  sabado: boolean = false;
  domingo: boolean = false;


  constructor(private rutaActiva: ActivatedRoute, private productoService: ProductoService, private toastrService: ToastrService, private ofertaService: OfertaService) {
    this.oferta = new Oferta();
    this.productos = new Array<Producto>();
    this.oferta.productos = new Array<string>();
    this.cargarProductos();
  }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(params => {
      if (params['id'] == 0) {
        this.toastrService.info("Complete todos los campos para crear una oferta.");
        this.accion = "new";
        this.oferta.dias = new Array<string>();
      } else {
        this.toastrService.info("Modifique algunos campos y guarde los cambios para modificar la oferta.");
        this.accion = "update";
        this.cargarOferta(params['id']);
      }
    });
  }

  crearOferta() {
    this.agregarDiasToOferta();
    this.ofertaService.registrarOferta(this.oferta).subscribe(
      result => {
        this.toastrService.success("Oferta registrada correctamente");
      },
      error => {
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
    this.oferta.productos.push(producto._id);
  }

  quitarProductoToOferta(idProducto: string) {
    var indice: number = this.oferta.productos.findIndex((prod) => prod == idProducto);
    this.toastrService.info("Producto quitado de la oferta.");
    this.oferta.productos.splice(indice, 1);
  }

  verificarCheboxes(): boolean {
    return this.lunes || this.martes || this.miercoles || this.jueves || this.viernes || this.sabado || this.domingo;
  }

  cargarDias(){
     for (const dia of this.oferta.dias) {
       if (dia=="Lunes") {
         this.lunes = true;
       }
       if (dia=="Martes") {
         this.martes = true;
       }
       if (dia=="Miercoles") {
         this.miercoles = true;
       }
       if (dia=="Jueves") {
         this.jueves = true;
       }
       if (dia=="Viernes") {
         this.viernes = true;
       }
       if (dia=="Sabado") {
         this.sabado = true;
       }
       if (dia=="Domingo") {
         this.domingo = true;
       }
     }
  }

  private agregarDiasToOferta() {
    this.oferta.dias = new Array<string>();
    if (this.lunes) {
      this.oferta.dias.push("Lunes");
    } else {
      const index = this.oferta.dias.indexOf("Lunes");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.martes) {
      this.oferta.dias.push("Martes");
    }else{
      const index = this.oferta.dias.indexOf("Martes");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.miercoles) {
      this.oferta.dias.push("Miercoles");
    }else{
      const index = this.oferta.dias.indexOf("Miercoles");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.jueves) {
      this.oferta.dias.push("Jueves");
    }else{
      const index = this.oferta.dias.indexOf("Jueves");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.viernes) {
      this.oferta.dias.push("Viernes");
    }else{
      const index = this.oferta.dias.indexOf("Viernes");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.sabado) {
      this.oferta.dias.push("Sabado");
    }else{
      const index = this.oferta.dias.indexOf("Sabado");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
    }
    if (this.domingo) {
      this.oferta.dias.push("Domingo");
    }else{
      const index = this.oferta.dias.indexOf("Domingo");
      if (index !== -1) {
        this.oferta.dias.splice(index, 1);
      }
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

  cargarOferta(id: string) {
    this.ofertaService.obtenerOferta(id).subscribe(
      result => {
        result.forEach((element: any) => {
          Object.assign(this.oferta, element);
          this.cargarDias()
        });
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  modificarOferta() {
    this.agregarDiasToOferta();
    this.ofertaService.modificarOferta(this.oferta).subscribe(
      result => {
        this.toastrService.success("Oferta modificada correctamente");
      },
      error => {
        this.toastrService.error("Error:", error);
      }
    );
  }

}
