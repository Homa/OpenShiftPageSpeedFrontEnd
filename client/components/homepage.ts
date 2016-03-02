import {Component, OnInit} from 'angular2/core';
import {NgClass, NgIf, NgFor} from 'angular2/common';
import {PagespeedService} from '../services/pagespeed';

@Component({
    selector: 'homepage',
    providers: [PagespeedService],
    template: `
        <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
            <div class="page-score-container">
                <div class="demo-card-wide mdl-card mdl-shadow--2dp page-score" *ngFor="#score of scores">
                    <div class="mdl-card__title" style="display: block;">
                        <div class="medium">{{score.page}}</div>
                        <div class="small text-muted">{{score.title}}</div>
                    </div>
                    <div class="mdl-card__supporting-text device-score-container">
                        <div *ngIf="score.desktop" class="device-score">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve">
                                <g>
                                    <rect x="7" y="20" width="85" height="50" [attr.fill]="getFill(score.desktop)" />
                                    <path d="M63.899,86.828c0,0-1.563-1.324-2.422-2.183c-0.86-0.86-1.093-1.634-1.093-1.634L59.705,76H40.754l-0.683,7.016   c0,0-0.235,0.974-1.095,1.833c-0.859,0.86-2.423,2.091-2.423,2.091s-1.406,0.716,0.704,1.028C38.466,88.146,43.856,88,48.188,88   h4.089c4.42,0,9.718,0.098,10.927-0.082C65.314,87.605,63.899,86.828,63.899,86.828z"/>
                                    <path d="M93.076,19H7.314C6.085,19,5,20.134,5,21.375v50.366C5,72.982,6.085,74,7.314,74h31.728h1.823h18.729h1.909h31.572   C94.306,74,95,72.982,95,71.741V21.375C95,20.134,94.306,19,93.076,19z M91,70H9V23h82V70z"/>
                                    <text class="score" x="50%" y="46%" text-anchor="middle">{{score.desktop}}</text>
                                </g>
                            </svg>
                        </div>
                        <div *ngIf="score.mobile" class="device-score">
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125" enable-background="new 0 0 100 100" xml:space="preserve">
                                <g>
                                    <rect x="30" y="15" width="40" height="68" [attr.fill]="getFill(score.mobile)" />
                                    <path fill="#000000" d="M72,11.055C72,7.711,69.29,5,65.947,5H35.053C31.71,5,29,7.711,29,11.055v77.891  C29,92.289,31.71,95,35.053,95h30.895C69.29,95,72,92.289,72,88.945V11.055z M50.458,8.759c1.023,0,1.853,0.829,1.853,1.854  c0,1.023-0.83,1.853-1.853,1.853c-1.023,0-1.853-0.829-1.853-1.853C48.604,9.588,49.434,8.759,50.458,8.759z M50.87,92.111  c-2.184,0-3.954-1.77-3.954-3.954c0-2.183,1.77-3.953,3.954-3.953c2.183,0,3.953,1.771,3.953,3.953  C54.822,90.342,53.053,92.111,50.87,92.111z M69,82H32V18h37V82z"/>
                                    <text class="score" x="50%" y="46%" text-anchor="middle">{{score.mobile}}</text>
                                </g>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    styles: [`
        .page-score-container {
            -webkit-display: flex;
            display: flex;
            -webkit-flex-wrap: wrap;
            flex-wrap: wrap;
        }

        .page-score {
            width: 100%;
            margin: 16px;
            box-sizing: border-box;
            overflow: hidden;
        }

        .device-score-container {
            -webkit-display: flex;
            display: flex;
            width: 100%;
        }

        .device-score {
            -webkit-flex: 1;
            flex: 1;
        }

        .score {
            font-family: "Open Sans", sans-serif;
            font-size: 28px;
            font-weight: 300;
            fill: white;
        }

        .medium {
            font-weight: bold;
            font-size: 20px;
            margin-bottom: 8px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .small {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            margin-bottom: 16px;
        }

        .text-muted {
            color: #777;
        }

        @media (min-width: 900px) {
            .page-score {
                width: calc(50% - 32px);
            }
        }
    `]
})

export class Homepage implements OnInit {
    scores = [];

    constructor(private _pagespeedService: PagespeedService) {}

    ngOnInit() {
        this.getCurrentScores();
    }

    getCurrentScores() {
        this._pagespeedService.getCurrentScores().subscribe(scores => this.scores = scores);
    }

    getFill(score) {
        if (score > 84) {
            return '#009a2d';
        }

        if (score > 64) {
            return '#fda100';
        }

        return '#dd4b39';
    }
}
