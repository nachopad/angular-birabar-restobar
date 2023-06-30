import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-lista-productos',
  templateUrl: './lista-productos.component.html',
  styleUrls: ['./lista-productos.component.css']
})
export class ListaProductosComponent implements OnInit {

  listaProductos!:Array<Producto>;
  listaCategorias!:Array<Categoria>;
  categoria!:Categoria;

  constructor(private categoriaService:CategoriaService, private productoService: ProductoService,private router:Router,
    private activatedRoute:ActivatedRoute, private toastrService: ToastrService) {
      this.listaCategorias=new Array<Categoria>();
      this.categoria=new Categoria();
  }

  ngOnInit(): void {
    this.obtenerCategorias();
    this.obtenerProductosDisponibles();
  }

  obtenerProductosDisponibles(){
    this.listaProductos= new Array<Producto>();
    this.productoService.obtenerProductosDisponibles().subscribe(
      (result)=>{
        result.forEach((element:any)=>{
          let unProducto:Producto=new Producto();
          Object.assign(unProducto, element);
          console.log(unProducto);
          this.listaProductos.push(unProducto);
        })
      },
      error=>{alert("Error");}
    );
  }
  
  obtenerCategorias(){
    this.categoriaService.obtenerCategoriasDisponibles().subscribe(
      (result) =>{
        result.forEach((element:any) => {
          let unaCategoria:Categoria = new Categoria();
          Object.assign(unaCategoria, element);
          this.listaCategorias.push(unaCategoria);
        });
      },
      error => {alert("Error al cargar las lista de Categorias");}
    )
    console.log(this.listaCategorias);
  }

  filtrarProducto(id:string){
    this.listaProductos=new Array<Producto>();
    this.categoria = this.listaCategorias.find(c=>(c._id==id))!;

    this.productoService.obtenerProductosPorCategoria(id).subscribe(
      (result)=>{
        result.forEach((element:any)=>{
          let unProducto:Producto=new Producto();
          Object.assign(unProducto, element);
          console.log(unProducto);
          this.listaProductos.push(unProducto);
        })
      },
      error=>{alert("Error");}
    )
  }
}
