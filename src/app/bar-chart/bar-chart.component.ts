import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarChartComponent implements OnInit {
  // @Input() dataset: any;
  // @Input() labels: any;

  public chartColors: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    scaleShowVerticalLines: false
  };

  constructor() { }
  public chartLabels = ['Control', 'ASRB', 'ICC', 'India', 'Sarawak'];
  public chartType = 'bar';
  public chartLegend = true;
  public chartData = [
    {data: [1539, 719, 5257, 5257, 758], label: 'Participants'},
    {data: [1678, 1024, 2727, 3705, 900], label: 'Post LCL-Phase'},
    {data: [739, 206, 2800, 29, 0], label: 'Pre-Transform'},
    {data: [50, 102, 184, 179, 94], label: 'T-H Phase'}
  ];

  ngOnInit() {
  }

}
