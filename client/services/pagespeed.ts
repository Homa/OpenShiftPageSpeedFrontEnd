import { Injectable } from 'angular2/core';
import { Http, URLSearchParams } from 'angular2/http';

@Injectable()
export class PagespeedService {
    apiUrl = '[YOUR-API-HOST-URL-GOES-HERE]';

    constructor(public http: Http) { }

    siteLists() {
        return this.http.get(`${this.apiUrl}/pages`).map(res => res.json());
    }

    load(url, strategy) {
        return this.http.get(`${this.apiUrl}/milestones/${strategy}/${url}`).map(res => res.json());
    }

    getCurrentScores() {
        return this.http.get(`${this.apiUrl}/currentscore`).map(res => res.json());
    }

    getScores(url) {
        var params = new URLSearchParams();
        params.set('site', encodeURIComponent(url));
        return this.http.get(`${this.apiUrl}/scores`, { search: params }).map(res => res.json());
    }
}
