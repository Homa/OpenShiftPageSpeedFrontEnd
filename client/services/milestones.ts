import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class MilestonesService {

    constructor(public http: Http) { }

    siteLists(url, strategy) {
        return this.http.get('[YOUR-API-HOST-URL-GOES-HERE]/siteslist').map(res => res.json());
    }

    load(url, strategy) {
        return this.http.get('[YOUR-API-HOST-URL-GOES-HERE]/milestones/' + strategy + '/' + url).map(res => res.json());
    }
}
