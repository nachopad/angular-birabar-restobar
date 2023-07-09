import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { CalificacionService } from 'src/app/services/calificacion.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  title = 'ng2-charts-demo';
  resumen!:Array<any>;
  mostrar = false;

  public barChartLegend = true;
  
  public barChartPlugins = [];

  public barChartData!: ChartConfiguration<'bar'>['data']; 

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
        },
        title:
      {
        display:true,
        text:"Cantidad de calificaciones",
        font:
        {
          size:20
        }
      }
      }
  }
};


  // Pie
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ 'Muy malo' ,  'Malo' , 'Regular' , 'Muy bueno' ,'Excelente' ];
  public pieChartDatasets=[ {
    data: this.resumen
  } ]
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private calificacionService:CalificacionService) {
  
   }

   ngOnInit(): void {

  this.calificacionService.obtenerResumen().subscribe(
    result=>
    {
      this.resumen = new Array();
     console.log(result);
     result.forEach((element:any) => {
      this.resumen.push(element.count);
     });

     this.barChartData = {
      labels: [ 'Muy malo' ,  'Malo' , 'Regular' , 'Muy bueno' ,'Excelente' ],
      datasets: [
        { data: this.resumen , label: 'Calificaciones' }
      ]
    };

    this.pieChartDatasets = [ {
      data: this.resumen
    } ]



     this.mostrar = true;
    },
    error=>
    {

    }
  )
  }
  

  
}
