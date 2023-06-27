import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-oferta-form',
  templateUrl: './oferta-form.component.html',
  styleUrls: ['./oferta-form.component.css']
})
export class OfertaFormComponent implements OnInit {

  accion!:string;

  constructor(private rutaActiva: ActivatedRoute) { }

  ngOnInit(): void {
    this.rutaActiva.params.subscribe(params => {
      if (params['id'] == 0) {
        this.accion = "new";
      } else {
        this.accion = "update";
      }
    });
  }

}
