import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
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
              private webTitle: Title,
              private route:Router) {
    
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
    return this.combo.productos.some((element: Producto) => element._id === producto._id);


  }

  eliminarProducto(p:Producto)
  {
    const index = this.combo.productos.findIndex((element: Producto) => element._id === p._id);
  if (index !== -1) {
    this.combo.productos.splice(index, 1);
    this.calcularPrecioLista();
    this.calcularMontoFinal();
  }
  if(this.combo.productos.length==0)
   {
    this.precioLista=0; 
    this.combo.montoFinal = 0; 
    this.combo.descuento = 0; 
   }

  }

  agregarProducto(p:Producto)
  {
    this.combo.productos.push(p);
   this.calcularPrecioLista();
   this.calcularMontoFinal();
  }

  calcularPrecioLista():void{
    const acumulado = this.combo.productos.reduce((total, producto) => total + producto.precio, 0);
   this.precioLista = acumulado; 
  }

  registrarProducto():void{
    this.calcularMontoFinal();
    this.combo.productos.forEach((element)=>
    {
      element.imagen="";
    })
    this.comboService.registrarCombo(this.combo).subscribe(
      result=>
      {
       this.toast.success("El combo fue registrado correctamente")
       this.route.navigateByUrl("comboGestion")
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
      this.calcularPrecioLista();
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
      this.toast.success("Editado correctamente");
      this.route.navigateByUrl("comboGestion");
    },
    error=>
    {

    }
  )
}
}
