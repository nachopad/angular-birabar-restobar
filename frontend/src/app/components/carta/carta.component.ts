import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { Producto } from 'src/app/models/producto';
import { CategoriaService } from 'src/app/services/categoria.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-carta',
  templateUrl: './carta.component.html',
  styleUrls: ['./carta.component.css']
})
export class CartaComponent implements OnInit {

  listaProductos!:Array<Producto>;
  listaCategorias!:Array<Categoria>;

  constructor(private categoriaService: CategoriaService, private productoService: ProductoService, private router:Router ) { 
    this.listaCategorias=new Array<Categoria>();
  }

  ngOnInit(): void {
    this.obtenerCategorias();
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

  productosPorCategoria(id:string){
    this.router.navigate(['menu-productos', id]);
  }

}
