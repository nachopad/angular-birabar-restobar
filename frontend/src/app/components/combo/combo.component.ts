import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Combo } from 'src/app/models/combo';
import { Producto } from 'src/app/models/producto';
import { ComboService } from 'src/app/services/combo.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  combos!:Array<Combo>;
  comboModal: Combo = new Combo();
  productosModal!: Array<Producto>;
  constructor(private comboService:ComboService, private toastService:ToastrService, private productoService:ProductoService) {
    this.toastService.info("Para ver más información acerca de los combos, hacer click."); 
    this.cargarCombos();
  }

  ngOnInit(): void {
  
  }


  
  cargarCombos() {
    this.combos = new Array<Combo>();
    this.comboService.obtenerCombos().subscribe(
      result=>
      {
         result.forEach((element:any) => {
          let combo = new Combo();
          Object.assign(combo,element);
          this.combos.push(combo);
         });
      },
      error=>
      {
        this.toastService.error("Error: ", error);
      }
    )
  }

  cargarProductos(combo: Combo) {

    this.productosModal = new Array<Producto>();
    this.comboModal = combo;
    this.comboModal.productos.forEach(id => { 
      this.productoService.obtenerProducto(id).subscribe(
        result => {
          let prod: Producto = new Producto();
          result.forEach((element: any) => {
            Object.assign(prod, element);
            this.productosModal.push(prod);
          });
        },
        error => {
          this.toastService.error("Error: ", error)
        }
      );
    });
  }




}
