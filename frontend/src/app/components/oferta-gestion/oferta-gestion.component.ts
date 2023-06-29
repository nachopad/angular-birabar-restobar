import { Component, OnInit } from '@angular/core';
import { Oferta } from 'src/app/models/oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-oferta-gestion',
  templateUrl: './oferta-gestion.component.html',
  styleUrls: ['./oferta-gestion.component.css']
})
export class OfertaGestionComponent implements OnInit {

  ofertas!: Array<Oferta>;

  constructor(private ofertaService: OfertaService, private toastrService: ToastrService) {
    this.cargarOfertas();
  }

  ngOnInit(): void {

  }

  cargarOfertas() {
    this.ofertaService.cargarOfertas().subscribe(
      result => {
        this.ofertas = new Array<Oferta>();
        result.forEach((element: any) => {
          let oferta: Oferta = new Oferta();
          Object.assign(oferta, element);
          this.ofertas.push(oferta);
        });
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

}
