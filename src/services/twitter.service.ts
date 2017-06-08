import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()

export class TwitterService {
    private tokenCredentials = window.btoa('DPveMwOJTKECiF7G5bRqbpozv' + ':' + '0Xu0RHy68SLpWgd9kdsaLijIYFiQDNysAQfPTTkJMyGPkjapzD')
    private retrievedAccessToken: String = null;

    constructor(public http: Http) {

    }

    getHeaders() {
        return this.http.get('https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi', { headers: this.getHeadersWithAccessToken() })
            .map(res => res.json())
            .map(data => {
                debugger;
                return [];
            });
    }

    private getHeadersWithAccessToken() {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.retrievedAccessToken
        });
    }

    issueToken() {
        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + this.tokenCredentials
        });
        return this.http.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', {
            headers
        })
            .map(res => res.json())
            .map(data => this.retrievedAccessToken = data.access_token);
    }
}