import {Component, EventEmitter, Input, OnChanges, SimpleChange} from 'angular2/core';
import {CORE_DIRECTIVES, FORM_DIRECTIVES, NgClass} from 'angular2/common';

import {BaseChart} from './charts';

@Component({
  selector: 'polar-area-chart',
  directives: [BaseChart, NgClass, CORE_DIRECTIVES, FORM_DIRECTIVES],
  template:`
          <base-chart class="chart"
            [data]="polarAreaChartData"
            [labels]="polarAreaChartLabels"
            [colours]="polarAreaChartColours"
            [legend]="polarAreaLegend"
            [chartType]="polarAreaChartType"
            (chartHover)="chartHovered($event)"
            (chartClick)="chartClicked($event)">
          </base-chart>
          <div style="text-align:center">Graph Scale: KB</div>
  `
})

export class PolarAreaChart implements OnChanges {

  @Input() pagestates;

  private polarAreaChartData: Array<number>;
  private polarAreaLegend: boolean = true;
  private polarAreaChartType: string = 'PolarArea';
  private polarAreaChartLabels: Array<string> = ['JS', 'Images', 'CSS', 'HTML', 'Text'];
  private polarAreaChartColours: Array<any> = [
    {
      fillColor: 'rgba(151,187,205,0.2)',
      strokeColor: 'rgba(151,187,205,1)',
      pointColor: 'rgba(151,187,205,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(151,187,205,0.8)',
      color: 'rgba(151,187,205,1)',
      highlight: 'rgba(151,187,205,0.8)'
    }, {
      fillColor: 'rgba(220,220,220,0.2)',
      strokeColor: 'rgba(220,220,220,1)',
      pointColor: 'rgba(220,220,220,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(220,220,220,0.8)',
      color: 'rgba(220,220,220,1)',
      highlight: 'rgba(220,220,220,0.8)'
    },
    {
      fillColor: 'rgba(247,70,74,0.2)',
      strokeColor: 'rgba(247,70,74,1)',
      pointColor: 'rgba(247,70,74,1)',
      pointStrokeColor: '#fff',
      pointHighlightFill: '#fff',
      pointHighlightStroke: 'rgba(247,70,74,0.8)',
      color: 'rgba(247,70,74,1)',
      highlight: 'rgba(247,70,74,0.8)'
    }
  ];

  constructor() {
  }

  ngOnChanges(changes: { [pagestates: string]: SimpleChange }) {

    this.polarAreaChartData = [
      (parseFloat(this.pagestates.javascriptResponseBytes)/1024),
      (parseFloat(this.pagestates.imageResponseBytes) / 1024),
      (parseFloat(this.pagestates.cssResponseBytes) / 1024),
      (parseFloat(this.pagestates.htmlResponseBytes)/1024),
      (parseFloat(this.pagestates.textResponseBytes) / 1024)
    ];

  }

  // events
  chartClicked(e:any) {
    //console.log(e);
  }
  chartHovered(e:any) {
    //console.log(this.pagestates);
    //console.log(e);
  }
}
