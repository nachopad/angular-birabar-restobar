import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Oferta } from 'src/app/models/oferta';

@Component({
  selector: 'app-oferta-gestion',
  templateUrl: './oferta-gestion.component.html',
  styleUrls: ['./oferta-gestion.component.css']
})
export class OfertaGestionComponent implements OnInit {

  ofertas!:Array<Oferta>;

  constructor(private webTitle: Title) { 
    this.ofertas = new Array<Oferta>();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de ofertas");
  }

}
