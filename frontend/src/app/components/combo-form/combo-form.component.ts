import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Combo } from 'src/app/models/combo';
import { Producto } from 'src/app/models/producto';
import { ComboService } from 'src/app/services/combo.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-combo-form',
  templateUrl: './combo-form.component.html',
  styleUrls: ['./combo-form.component.css']
})
export class ComboFormComponent implements OnInit {

  combo!:Combo;
  accion!:string;
  productos!:Array<Producto>;
  precioLista!:number; 
  descuentoSeleccionado="";
  constructor(private router:ActivatedRoute, private productoService:ProductoService, 
              private comboService:ComboService, private toast:ToastrService,
              private webTitle: Title) {
    
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Crear combo");
    this.precioLista = 0;
   this.productos=new Array<Producto>();
    this.cargarProductos();
    this.router.params.subscribe(params => {
      this.combo=new Combo();
      if (params['id'] == 0) {
        this.accion = "new";
      } else {
        this.accion="update"
        this.cargarCombo(params['id']);
      }
    });


    this.combo=new Combo();
  }

  cargarProductos():void
  {
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

  marcarProducto(p:Producto)
  {
    this.perteneceProducto(p) ?  this.eliminarProducto(p) : this.agregarProducto(p); 
  }

  perteneceProducto(producto:Producto):boolean
  {
   let result = this.combo.productos.indexOf(producto);
   return result>=0;
  }

  eliminarProducto(p:Producto)
  {
    this.combo.productos.splice( this.combo.productos.indexOf(p), 1);
    this.precioLista -= p.precio;
  }

  agregarProducto(p:Producto)
  {
    this.combo.productos.push(p);
    this.precioLista += p.precio;
  }

  registrarProducto():void{
    this.calcularMontoFinal();
    this.comboService.registrarCombo(this.combo).subscribe(
      result=>
      {
       this.toast.success("El combo fue registrado correctamente")
      },
      error=>
      {

      }
    )
  }

  calcularMontoFinal()
  {
    if(this.descuentoSeleccionado=="porcentaje")
      this.combo.montoFinal= this.precioLista - (this.precioLista*this.combo.descuento);
    else
      this.combo.descuento=  parseFloat(((100-((this.combo.montoFinal*100)/this.precioLista))/100).toFixed(2));
  
  }
 
  cargarCombo(id:string)
{
  this.comboService.obtenerComboById(id).subscribe(
    result=>
    {
      Object.assign(this.combo,result);
    },
    error=>
    {

    }
  )
}

editarCombo()
{
  this.comboService.editarCombo(this.combo).subscribe(
    result=>
    {
      this.toast.success("Editado correctamente")
    },
    error=>
    {

    }
  )
}
}
