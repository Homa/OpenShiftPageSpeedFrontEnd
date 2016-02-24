import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import {Dashboard} from './dashboard';
import {Homepage} from './homepage';
import {Linechart} from './linechart';

@RouteConfig([
    { path: '/milestones', name: 'Dashboard', component: Dashboard },
    { path: '/linechart', name: 'Linechart', component: Linechart },
    { path: '/', name: 'Homepage', component: Homepage }
    ])

@Component({
    selector: 'app',
    directives: [ ROUTER_DIRECTIVES ],
    template: `
    <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
        <header class="mdl-layout__header">
            <div class="mdl-layout__header-row">
                <span class="mdl-layout-title"><a class="mdl-navigation__link" [routerLink]="['Homepage']">Page Speed Viewer</a></span>
                <div class="mdl-layout-spacer"></div>
                <nav class="mdl-navigation mdl-layout--large-screen-only">
                    <a class="mdl-navigation__link" [routerLink]="['Linechart']">Line Charts</a>
                    <a class="mdl-navigation__link" [routerLink]="['Dashboard']">Milestones</a>
                    <a class="mdl-navigation__link" [routerLink]="['Homepage']">Home</a>
                </nav>
            </div>
        </header>
        <main class="mdl-layout__content" style="padding: 20px;">
            <router-outlet></router-outlet>
        </main>
    </div>
    `
})

export class App {
}
