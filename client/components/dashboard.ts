import {Component, Directive} from 'angular2/core';
import {NgIf, NgFor, NgModel} from 'angular2/common';
import {Summary} from './summary';
import {MilestonesService} from '../services/milestones';
import {PolarAreaChart} from './polar-area-chart';
import {CamelCaseToTextPipe} from '../pipes/CamelCaseToText.pipe';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {ObjToArrSummaryPipe} from '../pipes/ObjToArrSummary.pipe';
import {PlaceDataInPlaceholdersPipe} from '../pipes/placeDataInPlaceholders.pipe';
import {PlaceDataInPlaceholders2Pipe} from '../pipes/placeDataInPlaceholders2.pipe';

@Component({
    selector: 'dashboard',
    providers: [MilestonesService],
    pipes: [CamelCaseToTextPipe, ObjToArrSummaryPipe, PlaceDataInPlaceholdersPipe, PlaceDataInPlaceholders2Pipe],
    directives: [NgIf, NgFor, Summary, PolarAreaChart, ROUTER_DIRECTIVES],
    template: `
    <div *ngIf="loading" class="spinner-wrapper">
        <div class="spinner spinner-inline spinner-lg"></div>
    </div>
    <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--3-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <div class="mdl-selectfield">
                <label>Site</label>
                <select class="browser-default" (change)="getUrl($event)">
                    <option>Select a url</option>
                    <option *ngFor="#site of sitelists" [value]="site.id">{{site.url}}</option>
                </select>
            </div>
        </div>
        <div class="mdl-cell mdl-cell--3-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <div class="mdl-selectfield">
                <label>Device</label>
                <select class="browser-default" (change)="getStrategy($event)">
                    <option value="desktop">Desktop</option>
                    <option value="mobile">Mobile</option>
                </select>
            </div>
        </div>
    </div>
    <div  class="mdl-grid" *ngIf="noResult">
        <div class="mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">No Result Found :(</div>
    </div>
    <div class="mdl-grid" *ngIf="milestones && milestones.length !== 0">
        <div class="pagespped-cards mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <ul class="mdl-list">
                <li class="mdl-list__item">
                    <span style="padding-right:20px">
                        <div style="font-size: 0.5em;line-height: 14px;text-align: center;">SPEED</div>
                        <div style="font-size: 1.2em;text-align: center">{{milestones[0].results.ruleGroups.SPEED.score}}</div>
                    </span>
                    <span style="padding-right:20px" *ngIf="milestones[0].results.strategy === 'mobile'">
                        <div style="font-size: 0.5em;line-height: 14px;text-align: center;" >USABILITY</div>
                        <div style="font-size: 1.2em;text-align: center">{{ milestones[0].results.ruleGroups.USABILITY.score}}</div>
                    </span>
                    <span class="break">
                        <strong>{{milestones[0].results.strategy | uppercase}}:</strong><br/> {{milestones[0].results.id}}
                    </span>
                </li>
            </ul>
            <ul>
                <li>Number of resources: {{ lastMilestoneStateWithByteSizes.numberResources }}</li>
                <li>Number of JS resources: {{ lastMilestoneStateWithByteSizes.numberJsResources }}</li>
                <li>Number of CSS resources: {{ lastMilestoneStateWithByteSizes.numberCssResources }}</li>
                <li>Number of Static Resources: {{ lastMilestoneStateWithByteSizes.numberStaticResources }}</li>
                <li>Number of Hosts: {{ lastMilestoneStateWithByteSizes.numberHosts }}</li>
            </ul>

            <hr/>

            <ul>
                <li><b>HTML</b>: {{ lastMilestoneStateWithByteSizes.htmlResponseBytes }}</li>
                <li><b>Text</b>: {{ lastMilestoneStateWithByteSizes.textResponseBytes }}</li>
                <li><b>CSS:</b> {{ lastMilestoneStateWithByteSizes.cssResponseBytes}}</li>
                <li><b>Images:</b> {{ lastMilestoneStateWithByteSizes.imageResponseBytes}}</li>
                <li><b>JavaScript:</b> {{ lastMilestoneStateWithByteSizes.javascriptResponseBytes}}</li>
                <li><b>Data Request:</b> {{ lastMilestoneStateWithByteSizes.totalRequestBytes}}</li>
                <li><b>Other:</b> {{ lastMilestoneStateWithByteSizes.otherResponseBytes}}</li>
            </ul>
        </div>
        <div class="pagespped-cards mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <h1><small>Actions Required</small></h1>
            <ul class="mdl-list" style="padding: 0px;">
                <li style="padding: 0px;" class="mdl-list__item  mdl-list__item--two-line" *ngFor="#item of sortRules(milestones[0].results.formattedResults.ruleResults)">
                <span class="mdl-list__item-primary-content">
                <span>
                {{item.name | camelCaseToText}}
                </span>
                <span class="mdl-list__item-text-body">
                <div><b>+{{item.impact}}</b> points</div>
                </span>
                </span>
                </li>
            </ul>
        </div>
        <div class="pagespped-cards mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--4-col mdl-cell--12-col-tablet mdl-cell--12-col-phone">
            <h1><small>Resources Size</small></h1>
            <polar-area-chart [pagestates]="milestones[0].results.pageStats"></polar-area-chart>
        </div>
    </div>

    <div class="mdl-grid" *ngIf="rulesHidden && milestones && milestones.length !== 0">
        <div class="mdl-cell mdl-cell--12-col mdl-cell--hide-tablet mdl-cell--hide-phone" style="text-align:center;">
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-button--colored" (click)="showHide()">
            View More Details
            </button>
        </div>
    </div>

    <div class="mdl-grid" *ngIf="!rulesHidden">
    <div class="pagespped-cards mdl-shadow--2dp mdl-color--white mdl-cell mdl-cell--12-col">
    <div style="text-align:right;float:right;" (click)="showHide()"><span class="close hairline"></span></div>
        <ul class="mdl-list">
            <li *ngFor="#rule of milestones[0].results.rulePoints">
                <div>
                    {{rule.key | camelCaseToText}} +{{rule.value}} points
                </div>
                <div  *ngFor="#urlBlock of milestones[0].results.formattedResults.ruleResults[rule.key] | objToArrSummary" >
                <div><i>{{urlBlock.summary}}</i></div>
                <div *ngFor="#urlBlockUrl of urlBlock.urlBlockHeader | objToArrSummary" >
                    <strong>Actions:</strong>
                    <div [innerHTML]="urlBlockUrl.summary"></div>
                        <ul>
                            <li *ngFor="#url of urlBlockUrl.urls">
                            {{ url.result.format | placeDataInPlaceholders2:url.result.args }}
                            </li>
                        </ul>
                    </div>
                </div>
                <hr/>
            </li>
        </ul>
    </div>
    </div>
    <div class="mdl-grid" *ngIf="milestones && milestones.length !== 0">
        <div class="mdl-cell mdl-cell--12-col mdl-grid">
            <div class="main mdl-cell mdl-cell--12-col">
                <ul class="cbp_tmtimeline">
                    <li *ngFor="#milestone of milestones">
                    <summary [milestone]="milestone"></summary>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `
})

export class Dashboard {
    public rulesHidden: boolean = true;
    public milestones: Array<string>;
    public sitelists: Array<string>;
    public url: string = '';
    public strategy: string = 'desktop';
    public loading: boolean = false;
    public noResult: boolean = false;
    private lastMilestoneState: string;
    public lastMilestoneStateWithByteSizes: any = {};

    constructor(public service: MilestonesService) {
        service.siteLists().subscribe(sitelists => {
            this.sitelists = sitelists;
        });
    }

    public getUrl(event) {
        this.url = event.target.value;
        this.loadPageSpeedData();
    }

    public getStrategy(event) {
        this.strategy = event.target.value;
        if (this.url !== '') {
            this.loadPageSpeedData();
        }
    }

    public showHide() {
        this.rulesHidden = !this.rulesHidden;
    }

    public sortRules(rules) {

        let result = [];
        _.forIn(rules, function(value, key) {

            let obj = {
                name: key,
                params: value,
                summary: '',
                impact: value.ruleImpact,
                urlBlocks: []
            };

            if (value.summary && value.ruleImpact !== 0) {

                obj.impact = parseFloat(obj.impact).toFixed(2);
                obj.summary = value.summary['format'];

                if (value.summary.args) {
                    let args = value.summary.args;
                    for (let i = 0, max = args.length; i < max; i++) {
                        let type = args[i].type;
                        if (type === 'HYPERLINK') {
                            obj.summary = obj.summary.replace('{{BEGIN_LINK}}', '<a href="' + args[i].value + '">');
                            obj.summary = obj.summary.replace('{{END_LINK}}', '</a>');
                        } else {
                            obj.summary = obj.summary.replace('{{' + args[i].key + '}}', args[i].value);
                        }
                    }
                }

                if (value.urlBlocks) {
                    obj.urlBlocks = value.urlBlocks;
                }

                result.push(obj);
            }
        });

        //sort
        result.sort((a, b) => {

            if (parseFloat(a.impact) > parseFloat(b.impact)) {
                return -1;
                //.completed because we want to sort the list by completed property
            } else if (parseFloat(a.impact) < parseFloat(b.impact)) {
                return 1;
            } else {
                return 0;
            }
        });

        return result;
    }

    public loadPageSpeedData() {

        let bytesToSize = function(bytes) {
            let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + sizes[i];
        };

        this.loading = true;
        this.noResult = false;
        //this.milestones = [];

        this.service.load(this.url, this.strategy).subscribe(milestones => {
            this.milestones = milestones;

            // Get the last mileston data to show it on top of the page
            if (this.milestones.length !== 0) {

                this.loading = false;
                this.noResult = false;
                this.lastMilestoneState = milestones[0].results.pageStats;
                let obj = {};

                _.forIn(this.lastMilestoneState, function(value, key) {

                    if (typeof value === 'string') {

                        obj[key] = bytesToSize(value);
                    } else {
                        obj[key] = value;
                    }

                });

                this.lastMilestoneStateWithByteSizes = obj;
            } else {
                this.loading = false;
                this.noResult = true;
            }

        });
    }
}
