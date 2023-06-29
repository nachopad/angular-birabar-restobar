import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { Categoria } from 'src/app/models/categoria';
import { CategoriaService } from 'src/app/services/categoria.service';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  categoria!: Categoria;
  accion:string="new";

  constructor(private categoriaService: CategoriaService, private router:Router,
    private activatedRoute:ActivatedRoute, private domSanitizer: DomSanitizer,
    private toastrService: ToastrService) { 
    this.categoria = new Categoria();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['id'] === '0'){
        this.accion="new";
      }else{
        this.accion="update";
        this.obtenerCategoria(params['id']);
      }
    });
  }

  registrarCategoria(){
    this.categoriaService.createCategoria(this.categoria).subscribe(
      (result)=>{
        if(result.status==1){
          this.toastrService.success("Se registro correctamente la categoria");
        }else{
          this.toastrService.error("Error al intentar registrar la categoria");
        }
      },
      error=>{this.toastrService.error("Error"+ error);;}
    )
    
  }

  obtenerCategoria(id: string){
    this.categoriaService.obtenerCategoria(id).subscribe(
      (result)=>{  
        Object.assign(this.categoria, result);
      }, 
      error=>{this.toastrService.error("Error al buscar la categoria");}
    )
  }

  actualizarCategoria(){
    this.categoriaService.updateCategoria(this.categoria).subscribe(
      (result)=>{
        if(result.status=='1'){
          alert(result.msg);
        }else{
          alert(result.msg);
        }
      },
      error=>{alert("Error en la actualizacion");}
    )
  }

  onFileSelected(event: any) {
    this.categoria.imagen=""
    const files = event.target.files[0];
    if(files.size > 80000){
      this.toastrService.warning("El tamaño maximo que se puede subir es de 80Kb");
      event.target.value="";
    }else{
      const reader = new FileReader();
      reader.onload = () => {
        let base64 = reader.result as string;
        this.categoria.imagen=base64;
      };
      reader.readAsDataURL(files);
    }
  }


}