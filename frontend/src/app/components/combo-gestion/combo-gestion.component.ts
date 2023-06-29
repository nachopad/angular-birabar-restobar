import { Component, OnInit } from '@angular/core';
import { Combo } from 'src/app/models/combo';
import { ComboService } from 'src/app/services/combo.service';

@Component({
  selector: 'app-combo-gestion',
  templateUrl: './combo-gestion.component.html',
  styleUrls: ['./combo-gestion.component.css']
})
export class ComboGestionComponent implements OnInit {

  combos!:Array<Combo>;
  constructor(private comboService:ComboService) {
    this.combos = new Array<Combo>(); 
   }

  ngOnInit(): void {
    this.cargarCombos(); 
  }

  cargarCombos():void
  {
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
   
  },
  error=>
  {

  }
)
  }
}
