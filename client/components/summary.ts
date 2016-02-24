import {Component} from 'angular2/core';
import {NgClass, NgIf, NgFor} from 'angular2/common';
import {ObjToArrayPipe} from '../pipes/ObjToArr.pipe';
import {DateFilter} from '../pipes/DateFilter.pipe';
import {CamelCaseToTextPipe} from '../pipes/CamelCaseToText.pipe';
import {SortPipe} from '../pipes/Sort.pipe';
import {SortPipe2} from '../pipes/Sort2.pipe';

@Component({
    selector: 'summary',
    pipes: [ObjToArrayPipe, DateFilter, CamelCaseToTextPipe, SortPipe, SortPipe2],
    inputs: ['milestone'],
    directives: [NgClass, NgIf, NgFor],
    template: `
    <div class="cbp_tmicon" [ngClass]="{'red': isNegative(), 'green': isPositive()}">{{milestone.scoreDiff}}</div>
        <time class="cbp_tmtime" datetime="2013-04-11T12:04">{{milestone.date | dateFilter}}</time>
        <div class="cbp_tmlabel mdl-color--white mdl-shadow--2dp">
            SPEED: {{milestone.results.ruleGroups.SPEED.score}} <br>
        <div *ngIf="milestone.results.strategy === 'mobile'">
            USABILITY: {{milestone.results.ruleGroups.USABILITY.score}}
        </div>
        <ul class="mdl-list">
            <li class=""  style="letter-spacing: .04em;color:rgba(0,0,0,.87); font-weight:normal;padding: 8px 0;" *ngFor="#item of milestone.results.pageStats | objToArrayPipe: milestone.pageDiff">
                <span class="mdl-list__item-primary-content" *ngIf="item.diff!==''">
                    <span>
                        {{ displayValues[item.name]}}
                        </span>
                        <span style="margin-left: 15px;">
                        <span style="margin-right:10px;color: rgba(0,0,0,.54);">{{item.number}}</span>
                        <span style="margin-right:10px" class="{{item.color}}">{{item.diff}}</span>
                    </span>
                </span>
            </li>
        </ul>
        <ul class="mdl-list">
            <li class=""  style="letter-spacing: .04em;color:rgba(0,0,0,.87); font-weight:normal;padding: 8px 0;" *ngFor="#item of milestone.results.rulePoints | sort2">
                <span class="mdl-list__item-primary-content" *ngIf="item.value!==0">
                    <span>
                        <span style="margin-right:10px;color: rgba(0,0,0,.54);">{{item.key | camelCaseToText}}</span>
                        <span style="margin-right:10px">{{item.value}}</span>
                        <span style="margin-right:10px" [ngClass]="{'red': item.ruleDiff > 0, 'green': item.ruleDiff < 0}">{{item.ruleDiff}}</span>
                    </span>
                </span>
            </li>
        </ul>
    </div>
    `
})

export class Summary {
    public rules;
    public milestone;

    public displayValues = {
        numberResources: 'Number of Resources',
        numberJsResources: 'Number of Js Resources',
        numberCssResources: 'Number of CSS Resources',
        numberStaticResources: 'Number of Static Resources',
        numberHosts: 'Number of Hosts',
        htmlResponseBytes: 'HTML',
        textResponseBytes: 'Text',
        cssResponseBytes: 'CSS',
        imageResponseBytes: 'Images',
        javascriptResponseBytes: 'JavaScript',
        otherResponseBytes: 'Other',
        totalRequestBytes: 'Data Request'
    };

    public isNegative() {

        if (this.milestone && this.milestone.scoreDiff && this.milestone.scoreDiff < 0) {
            return true;
        } else {
            return false;
        }
    }

    public isPositive() {

        if (this.milestone && this.milestone.scoreDiff && this.milestone.scoreDiff > 0) {
            return true;
        } else {
            return false;
        }
    }
}
