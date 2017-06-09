import { Injectable } from '@angular/core';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


export interface ISearchMetadata {
    completed_in: number;
    count: number;
    max_id: number;
    max_id_str: string;
    next_results: string;
    query: string;
    refresh_url: string;
    since_id: number;
    since_id_str: string;
}

// entities
// {
//         hashtags: [
//             {text: "JavaScript", indices: [19, 30]}, {text: "Developer", indices: [31, 41]},…],…}

// metadata
// {iso_language_code: "en", result_type: "recent"}


// retweeted_status
// {created_at: "Thu Jun 08 13:45:42 +0000 2017", id: 872811877306433500, id_str: "872811877306433536",…}
export interface IStatus {
    contributors?: any;
    coordinates?: any;
    created_at?: string
    entities?: any;
    favorite_count?: number;
    favorited?: boolean;
    geo?: any;
    id?: number
    id_str?: string;
    in_reply_to_screen_name?: any;
    in_reply_to_status_id?: any;
    in_reply_to_status_id_str?: any;
    in_reply_to_user_id?: any;
    in_reply_to_user_id_str?: any;
    is_quote_status?: boolean;
    lang?: string;
    metadata?: any;
    place?: any;
    retweet_count?: number;
    retweeted?: boolean;
    retweeted_status?: any;
    source?: string;//link
    text: string;
    truncated?: boolean;
}

export interface ISearchResult {
    search_metadata: ISearchMetadata;
    statuses: Array<IStatus>;
}

@Injectable()
export class TwitterService {
    private tokenCredentials = window.btoa('DPveMwOJTKECiF7G5bRqbpozv' + ':' + '0Xu0RHy68SLpWgd9kdsaLijIYFiQDNysAQfPTTkJMyGPkjapzD')
    private retrievedAccessToken: string = null;

    constructor(public http: Http) {

    }

    search(phrase: string = '#javascript'): Observable<ISearchResult> {
        const s = `https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(phrase)}`;
        return this.http.get(s, { headers: this.getHeadersWithAccessToken() })
            .map(res => res.json())
            .map((data: ISearchResult) => data);
    }

    searchNext(nextPath: string) {
        return this.http.get(`https://api.twitter.com/1.1/search/tweets.json${nextPath}`, { headers: this.getHeadersWithAccessToken() })
            .map(res => res.json())
            .map((data: ISearchResult) => data);
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