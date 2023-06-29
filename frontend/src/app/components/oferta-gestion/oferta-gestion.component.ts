import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/models/oferta';

@Component({
  selector: 'app-oferta-gestion',
  templateUrl: './oferta-gestion.component.html',
  styleUrls: ['./oferta-gestion.component.css']
})
export class OfertaGestionComponent implements OnInit {

  ofertas!:Array<Oferta>;

  constructor() { 
    this.ofertas = new Array<Oferta>();
  }

  ngOnInit(): void {
  }

}
