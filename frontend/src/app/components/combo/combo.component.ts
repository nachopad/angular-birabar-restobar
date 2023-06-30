import { Component, OnInit } from '@angular/core';
import { Combo } from 'src/app/models/combo';
import { ComboService } from 'src/app/services/combo.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})
export class ComboComponent implements OnInit {

  combos!:Array<Combo>;
  constructor(private comboService:ComboService) { }

  ngOnInit(): void {
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

      }
    )
  }


}
