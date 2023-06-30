import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {

  listaCategorias!:Array<Categoria>;
  constructor(private categoriaService: CategoriaService, private router:Router) { 
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

  verProductos(id: string){
    this.router.navigate(['gestion-categoria-producto', id]);
  }

  registrarCategoria(){
    this.router.navigate(['alta-categoria', 0]);
  }

}
