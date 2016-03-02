import {Component, OnInit} from 'angular2/core';
import {NgClass, NgIf, NgFor, NgModel} from 'angular2/common';
import {PagespeedService} from '../services/pagespeed';

@Component({
    selector: 'linechart',
    providers: [PagespeedService],
    template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <div class="mdl-cell mdl-cell--3-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <div class="mdl-selectfield">
                <label>Site</label>
                <select class="browser-default" (change)="getUrlScores($event)" [(ngModel)]="selectedSite">
                    <option>Select a url</option>
                    <option *ngFor="#site of sites" [value]="site.url">{{site.url}}</option>
                </select>
            </div>
        </div>
        <canvas id="myChart" width="1000" height="600"></canvas>
        <div id="legend"></div>
    </div>`
})

export class Linechart implements OnInit {
    sites = [];
    chart = null;
    selectedSite = null;

    constructor(private _pagespeedService: PagespeedService) {}

    ngOnInit() {
        this.getSiteList();
    }

    getSiteList() {
        this._pagespeedService.siteLists().subscribe(sites => {
            this.sites = sites
            this.selectedSite = this.sites[0].url;
            this.getUrlScores({
                target: {
                    value: this.selectedSite
                }
            });
        });
    }

    getUrlScores(event) {
        this._pagespeedService.getScores(event.target.value).subscribe(scores => this.buildChart(scores));
    }

    buildChart(scores) {
        let labels = [];
        let desktop = {
            label: 'Desktop',
            fillColor: 'rgba(220,220,220,0.2)',
            strokeColor: 'rgba(220,220,220,1)',
            pointColor: 'rgba(220,220,220,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(220,220,220,1)',
            data: []
        };

        let mobile = {
            label: 'Mobile',
            fillColor: 'rgba(151,187,205,0.2)',
            strokeColor: 'rgba(151,187,205,1)',
            pointColor: 'rgba(151,187,205,1)',
            pointStrokeColor: '#fff',
            pointHighlightFill: '#fff',
            pointHighlightStroke: 'rgba(151,187,205,1)',
            data: []
        };

        scores.forEach(function (datum) {
            labels.push(moment(datum.date).format('MMM DD'));

            datum.results.forEach(function (result) {
                if (result.strategy === 'mobile') {
                    mobile.data.push(result.ruleGroups.SPEED.score);
                } else {
                    desktop.data.push(result.ruleGroups.SPEED.score);
                }
            });
        });

        let data = {
            labels: labels,
            datasets: [desktop, mobile]
        };

        if (this.chart) {
            this.chart.destroy();
        }

        let ctx = document.getElementById('myChart').getContext('2d');
        let chartDisplay = new Chart(ctx);

        this.chart = chartDisplay.Line(data, {
            scaleBeginAtZero: true,
            legendTemplate : '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
        });

        document.getElementById('legend').innerHTML = this.chart.generateLegend();
    }
}
