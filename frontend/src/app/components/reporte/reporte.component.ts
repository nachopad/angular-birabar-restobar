import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { CalificacionService } from 'src/app/services/calificacion.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  grafico!: string;
  resumen: Array<any> = [0,0,0,0,0];
  mostrar = false;
  categorias = ['Muy malo', 'Malo', 'Regular', 'Muy bueno', 'Excelente'];
  fechaDesde!:string; 
  fechaHasta!:string;
  filtro!:boolean;
  //Propiedades del barChart
  public barChartLegend = true;
  public barChartPlugins = [];
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#fff'
        },
        grid:
        {
          color: "rgba(255, 255, 255, 0.5)"
        }
      },
      x: {
        grid: {
          color: "rgba(255, 255, 255, 0.5)" // Cambiar el color de las cuadrículas en el eje x a blanco
        },
        ticks: {
          color: '#fff'
        },
      },
    },
    elements:
    {
      bar:
      {
        backgroundColor: 'rgb(254, 193, 14)', // Cambiar el color de las barras
        hoverBackgroundColor: 'rgba(254, 193, 14,0.7)'
      }
    }
  };


  public barChartColors: any[] = [
    {
      backgroundColor: 'rgba(255, 0, 0, 0.5)', // Cambiar el fondo del gráfico de barras
    }
  ];

  //   //Propiedades del pieChart
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    elements: {
      arc: {
        backgroundColor: [
          'rgba(255, 165, 0, 0.8)',
          'rgba(144, 238, 144, 0.8)',
          'rgba(135, 206, 250, 0.8)',
          'rgba(255, 255, 0, 0.8)',
          'rgba(255, 105, 180, 0.8)'
        ],
      },
    }
  };

  public pieChartLabels = this.categorias;
  public pieChartDatasets = [{
    data: this.resumen
  }]
  public pieChartLegend = true;
  public pieChartPlugins = [];


  constructor(private calificacionService: CalificacionService) {

  }

  ngOnInit(): void {
    this.grafico = "barra";
    this.cargarResumenTotal();

  }
  cambio(valor: any) {
    this.grafico = valor.target.value;
  }

  cargarResumenTotal(){ 
    this.calificacionService.obtenerResumen().subscribe(
      result => {
        this.resumen = [0,0,0,0,0];
        result.forEach((element:any) => {
          this.resumen[element.puntaje-1] = element.count;
        });
        
        this.barChartData = {
          labels: this.categorias,
          datasets: [
            { data: this.resumen, label: 'Calificaciones' },
          ]
        };

        this.pieChartDatasets = [{
          data: this.resumen
        }]


        this.mostrar = true;
      },
      error => {

      }
    )

  }


  filtrar()
  {
     let fechaDesdeDate = new Date(this.fechaDesde);
     fechaDesdeDate.setHours(24);
    let fechaHastaDate = new Date(this.fechaHasta);
    fechaHastaDate.setHours(24);

   let desde = fechaDesdeDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
   let hasta = fechaHastaDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    console.log(desde + " "+  hasta);

   this.calificacionService.obtenerResumenPorFecha(desde,hasta).subscribe(
    result=>{
      this.filtro=true;
      this.mostrar=false;
       this.resumen = [0,0,0,0,0];
       console.log("resumen " +result)
        result.forEach((element:any) => {
          console.log(element)
          this.resumen[element.puntaje-1] = element.count;
        });
        
        this.barChartData = {
          labels: this.categorias,
          datasets: [
            { data: this.resumen, label: 'Calificaciones' },
          ]
        };

        this.pieChartDatasets = [{
          data: this.resumen
        }]


        this.mostrar = true;
    },
    error=>
    {
      this.filtro=false;
      this.cargarResumenTotal();
    }
   )

   
  }

  limpiarFiltro()
  {
   this.cargarResumenTotal();
   this.filtro=false;
  }
  
 

}
