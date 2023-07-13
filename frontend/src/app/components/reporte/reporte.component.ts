import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ChartConfiguration, ChartOptions, ChartType } from "chart.js";
import { error } from 'console';
import { CalificacionService } from 'src/app/services/calificacion.service';
import { VentaService } from 'src/app/services/venta.service';


@Component({
  selector: 'app-reporte',
  templateUrl: './reporte.component.html',
  styleUrls: ['./reporte.component.css']
})
export class ReporteComponent implements OnInit {

  grafico!: string;
  resumen: Array<any> = [0, 0, 0, 0, 0];
  mostrar = false;
  categorias = ['Muy malo', 'Malo', 'Regular', 'Muy bueno', 'Excelente'];
  fechaDesde: string = "";
  fechaHasta: string = "";
  filtro!: boolean;
  mesProducto: number = 13;
  mostrarLine = false;
  mostrarCliente = false;
  filtroProductoVendidos = false;
  filtroCliente = false;
  mesCliente: number = 13;
  //tabla 
  tabla!: Array<any>;
  //propiedades de 
  datosVentas = { labels: [" ", " "], datos: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], paso: 0 }

  //Propiedades del barChart
  public barChartLegend = true;
  public barChartPlugins = [];
  barChartType = 'horizontalBar';
  public barChartData!: ChartConfiguration<'bar'>['data'];
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
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



  //Line Chart 
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ],
    datasets: [
      {
        data: [62, 59, 80, 81, 56, 55, 40],
        label: 'Ventas',
        fill: true,
        tension: 0.5,
        borderColor: 'black',
        backgroundColor: 'rgba(255,0,0,0.3)'
      }
    ]
  };
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
  };
  public lineChartLegend = true;





  constructor(private calificacionService: CalificacionService,
    private webTitle: Title,
    private ventaService: VentaService) {
    this.webTitle.setTitle("Birabar - Reportes");
  }

  ngOnInit(): void {
    this.grafico = "barra";
    this.cargarResumenTotal();
    this.cargarDatosVentas();
    this.cargarDatosResumenProducto();
    this.cargarDatosResumenCliente();

  }
  cambio(valor: any) {
    this.grafico = valor.target.value;
  }

  cambiarMesProductos(valor: any) {
    this.mesProducto = valor.target.value;
    console.log(this.mesProducto);
  }
  cambiarMesCliente(valor: any) {
    this.mesCliente = valor.target.value;
    console.log(this.mesProducto);
  }
  cargarResumenTotal() {
    this.calificacionService.obtenerResumen().subscribe(
      result => {
        this.resumen = [0, 0, 0, 0, 0];
        result.forEach((element: any) => {
          this.resumen[element.puntaje - 1] = element.count;
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


  filtrar() {
    let fechaDesdeDate = new Date(this.fechaDesde);
    fechaDesdeDate.setHours(24);
    let fechaHastaDate = new Date(this.fechaHasta);
    fechaHastaDate.setHours(24);
    let desde = fechaDesdeDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    let hasta = fechaHastaDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });
    console.log(desde + " " + hasta);

    this.calificacionService.obtenerResumenPorFecha(desde, hasta).subscribe(
      result => {
        this.filtro = true;
        this.mostrar = false;
        this.resumen = [0, 0, 0, 0, 0];
        console.log("resumen " + result)
        result.forEach((element: any) => {
          console.log(element)
          this.resumen[element.puntaje - 1] = element.count;
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
        this.filtro = false;
        this.cargarResumenTotal();
      }
    )


  }

  limpiarFiltro() {
    this.cargarResumenTotal();
    this.fechaDesde = "";
    this.fechaHasta = "";
    this.filtro = false;
  }

  cargarDatosVentas() {
    let meses = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre"
    ];

    this.ventaService.getVentasResumen().subscribe(
      result => {
        this.datosVentas.labels = meses.slice(0, result[result.length - 1]._id);
        console.log(this.datosVentas.labels);
        result.forEach((element: any, index: number) => {

          this.datosVentas.datos[element._id - 1] = element.cantidad;

        })
        console.log(this.datosVentas.datos);

        this.lineChartData.labels = this.datosVentas.labels;
        this.lineChartData.datasets[0].data = this.datosVentas.datos;
        this.mostrarLine = true;
      },
      error => {

      }

    )
  }


  //Reporte Horizontal

  public barChartLegend2 = true;
  public barChartPlugins2 = [];

  public barChartData2!: ChartConfiguration<'bar'>['data'];
  public barChartOptions2: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y', // Agregar esta línea para mostrar barras horizontales
  };


  cargarDatosResumenProducto() {
    let labels: string[] = [];
    let data: number[] = [];
    this.ventaService.getVentasProductoResumen(this.mesProducto).subscribe(
      result => {

        result.forEach((element: any) => {
          labels.push(element.nombre);
          data.push(element.cantidad);
        })

        if (this.mesProducto != 13) {
          this.filtroProductoVendidos = true;
          let mesTitulo = labels[this.mesProducto - 1];
        }
        this.barChartData2 = {
          labels: labels,
          datasets: [
            { data: data, label: 'Productos Vendidos' },
          ]
        }

      },
      error => {

      }
    )
  }

  //Reporte Horizontal2

  public barChartLegend3 = true;
  public barChartPlugins3 = [];

  public barChartData3!: ChartConfiguration<'bar'>['data'];
  public barChartOptions3: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'y', // Agregar esta línea para mostrar barras horizontales
  };


  cargarDatosResumenCliente() {
    let labels: string[] = [];
    let data: number[] = [];
    this.tabla = [];
    this.ventaService.getVentasClienteResumen(this.mesCliente).subscribe(
      result => {

        result.forEach((element: any) => {
          labels.push(element.cliente.usuario);
          data.push(element.totalCompras);
          this.tabla.push(element);
        })

        this.barChartData3 = {
          labels: labels,
          datasets: [
            { data: data, label: 'Clientes con compras' },
          ]
        }
        this.mostrarCliente = true;
        if (this.mesCliente != 13)
          this.filtroCliente = true
      },
      error => {

      }
    )
  }

}
