import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Oferta } from 'src/app/models/oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import { Title } from '@angular/platform-browser';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  ofertas!: Array<Oferta>;
  ofertasDisponibles!: Array<Oferta>;
  ofertaModal: Oferta = new Oferta();
  productosModal!: Array<Producto>;
  verOfertasDisponibles:Boolean =  true;

  constructor(private toastrService: ToastrService, private ofertaService: OfertaService, private webTitle: Title, private productoService: ProductoService) {
    this.toastrService.info("Para ver más información acerca de las ofertas hacer click.");
    this.ofertas = new Array<Oferta>();
    this.ofertasDisponibles = new Array<Oferta>();
    this.cargarOfertas();
    
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de ofertas");
  }

  cargarOfertas() {
    this.ofertaService.cargarOfertas().subscribe(
      result => {
        this.ofertas = new Array<Oferta>();
        result.forEach((element: any) => {
          let oferta: Oferta = new Oferta();
          Object.assign(oferta, element);
          this.ofertas.push(oferta);
        });
        this.cargarOfertasDisponibles();
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  cargarProductos(oferta: Oferta) {
    this.productosModal = new Array<Producto>();
    this.ofertaModal = oferta;
    this.ofertaModal.productos.forEach(id => {
      console.log(id);
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosModal.push(prod);
          });
        },
        error => {
          this.toastrService.error("Error: ", error)
        }
      );
    });
  }


  cargarOfertasDisponibles(){
    const diaHoy = this.obtenerDia();
    this.ofertasDisponibles = new Array<Oferta>(); 
    this.ofertas.forEach(oferta=>{
      oferta.dias.forEach(dia=>{
        if(dia==diaHoy)
          this.ofertasDisponibles.push(oferta);
      });
    });
  }

  obtenerDia():string{
    const fechaComoCadena = new Date(); // día lunes
    const dias = [
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado',
    ];
    const numeroDia = new Date(fechaComoCadena).getDay();
    const nombreDia = dias[numeroDia];
    return nombreDia;
  }

}
