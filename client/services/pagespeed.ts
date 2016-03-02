import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';

@Injectable()
export class PagespeedService {
    apiUrl = '[YOUR-API-HOST-URL-GOES-HERE]';

    constructor(public http: Http) { }

    siteLists(url, strategy) {
        return this.http.get(`${this.apiUrl}/pages`).map(res => res.json());
    }

    load(url, strategy) {
        return this.http.get(`${this.apiUrl}/milestones/${strategy}/${url}`).map(res => res.json());
    }

    getCurrentScores() {
        return this.http.get(`${this.apiUrl}/currentscore`).map(res => res.json());
    }
}
