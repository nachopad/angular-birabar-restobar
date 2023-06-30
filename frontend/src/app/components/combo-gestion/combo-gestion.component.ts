import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Combo } from 'src/app/models/combo';
import { ComboService } from 'src/app/services/combo.service';

@Component({
  selector: 'app-combo-gestion',
  templateUrl: './combo-gestion.component.html',
  styleUrls: ['./combo-gestion.component.css']
})
export class ComboGestionComponent implements OnInit {

  combos!:Array<Combo>;
  constructor(private comboService:ComboService,
              private webTitle: Title,
              private toast:ToastrService) {
    this.combos = new Array<Combo>(); 
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de combos");
    this.cargarCombos(); 
  }

  cargarCombos():void
  {
    this.combos=[];
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

      }
    )
  }

  eliminarCombo(id:string):void{
this.comboService.eliminarComboById(id).subscribe(
  result=>
  {
   this.toast.success("Combo Eliminado correctamente");
   this.cargarCombos();

  },
  error=>
  {

  }
)
  }
}
