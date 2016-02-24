import {bootstrap} from 'angular2/platform/browser';
import {ROUTER_PROVIDERS, LocationStrategy, HashLocationStrategy} from 'angular2/router';
import {HTTP_PROVIDERS} from 'angular2/http';
import {enableProdMode, provide} from 'angular2/core';

import 'rxjs/Rx';

import {App} from './components/app';

enableProdMode();
bootstrap(App, [HTTP_PROVIDERS, ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy })]);
