import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

const APP_KEY = 'YOUR_KEY';
const APP_SECRET = 'YOUR_SECRECT';

@Injectable()
export class TwitterService {
    private tokenCredentials = window.btoa(`${APP_KEY}:${APP_SECRET}`);

    private getHeaders: Function = null;

    constructor(public http: Http) { }

    /**
     * request new accessToken
     */
    issueToken(): Observable<string> {

        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + this.tokenCredentials
        });
        return this.http.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', { headers })
            .map(res => res.json())
            .map(data => {
                this.getHeaders = this.prebuildHeaders(data.access_token)
                return data.access_token;
            });
    }
    /**
     * create a function which builds a header-object with the supplied accessToken
     * @param accessToken - retrieved accessToken
     */
    prebuildHeaders(accessToken: string): Function {
        return (optionalHeaders: { [key: string]: any }) => {
            return new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
                ...optionalHeaders
            });
        }
    }
    /**
     * example method which shows the usage of curried function "getHeaders"
     * @param phrase - search phrase
     */
    public search(phrase: string = '#javascript'): Observable<any> {

        const searchPath = `https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(phrase)}`;
        const headers = this.getHeaders({ some: 'value' })

        return this.http.get(searchPath, { headers })
            .map(res => res.json());
    }
}