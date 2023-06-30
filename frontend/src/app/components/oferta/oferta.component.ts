import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Oferta } from 'src/app/models/oferta';
import { OfertaService } from 'src/app/services/oferta.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {

  ofertas!: Array<Oferta>;
  ofertaModal:Oferta=new Oferta();

  constructor(private toastrService: ToastrService, private ofertaService: OfertaService, private webTitle: Title) {
    this.toastrService.info("Para ver más información acerca de las ofertas hacer click.");
    this.ofertas = new Array<Oferta>();
    this.cargarOfertas();
  }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de ofertas");
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
