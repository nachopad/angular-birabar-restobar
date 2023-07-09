import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/models/cliente';
import { Combo } from 'src/app/models/combo';
import { ClienteService } from 'src/app/services/cliente.service';
import { ComboService } from 'src/app/services/combo.service';
import { WhatsappService } from 'src/app/services/whatsapp.service';

@Component({
  selector: 'app-combo-gestion',
  templateUrl: './combo-gestion.component.html',
  styleUrls: ['./combo-gestion.component.css']
})
export class ComboGestionComponent implements OnInit {

  combos!:Array<Combo>;
  constructor(private comboService:ComboService,
              private webTitle: Title,
              private toast:ToastrService,
              private clienteService:ClienteService,
              private whatsApp: WhatsappService,
              private toastrService: ToastrService) {
    this.combos = new Array<Combo>(); 
    this.comboEnviar=new Combo();
   }

  ngOnInit(): void {
    this.webTitle.setTitle("Birabar - Gestion de combos");
    this.cargarCombos();
    this.cargarClientes(); 
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

  comboEnviar!:Combo;

  cargarCombo(combo:Combo){
    this.comboEnviar=combo;
    console.log(this.comboEnviar);
  }

  async enviarMensaje(){
    this.clientes.forEach(cliente => {
      let mensaje = `Estimado/a : `+ cliente.usuario.nombre +`
      
      ` +this.construirMensaje();
      this.whatsApp.enviarMensaje(cliente.telefono, mensaje).subscribe(
        (result)=>{
            this.toastrService.info("Se le envio un mensaje para que realize el pago");
        },
        error=>{alert("Error");}
      )
    });

  }

  construirMensaje():string{
    return `Tenemos el agrado de informale que tenemos un combo imperdible:
  
          `+this.comboEnviar.titulo+ `  
    Con los siguientes productos: 
       -`+ this.comboEnviar.productos.map(producto => `${producto.nombreProducto}`).join(`, 
      `)+`
      Precio Final: `+this.comboEnviar.montoFinal;
  }

  clientes!:Array<Cliente>;
  cargarClientes(){
    this.clienteService.obtenerClientesSuscriptos().subscribe(
      (result) => {
        this.clientes=new Array<Cliente>();
        result.forEach((element: any) => {
          let cliente = new Cliente();
          Object.assign(cliente, element);
          this.clientes.push(cliente);
          console.log(this.clientes);
        });
      },
      (error) => {
        this.toastrService.error("Error: ", error);
      }
    );
  }

}
