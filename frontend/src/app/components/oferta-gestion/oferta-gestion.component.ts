import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
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
  searchOferta!: string;

  constructor(private ofertaService: OfertaService, private toastrService: ToastrService, private webTitle: Title) {
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

  borrarOferta(id: string) {
    this.ofertaService.borrarOferta(id).subscribe(
      result => {
        this.toastrService.success("Oferta eliminada correctamente.");
        this.cargarOfertas();
      },
      error => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

  buscarPorTitulo() {
    if (this.searchOferta.trim() !== '') {
      const ofertasEncontradas = this.ofertas.filter(oferta => oferta.titulo.toLowerCase().includes(this.searchOferta.toLowerCase()));
      this.ofertas = ofertasEncontradas;
    } else {
      this.cargarOfertas();
    }
  }

}
