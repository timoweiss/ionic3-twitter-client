import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';
import {
    TweetState,
} from '../reducers/tweets.reducer'

import {
    FETCH_SEARCH_TWITTER,
    RECEIVE_SEARCH_TWITTER,
    RESET_TWEETS,
    FETCH_NEXT_TWEETS,
    RECEIVE_NEXT_TWEETS,
} from '../constants/tweets.actions';

import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

export type SearchMetadata = {
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
export type Status = {
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

export type SearchResult = {
    search_metadata: SearchMetadata;
    statuses: Array<Status>;
}

@Injectable()
export class TwitterService {
    private tokenCredentials = window.btoa('DPveMwOJTKECiF7G5bRqbpozv' + ':' + '0Xu0RHy68SLpWgd9kdsaLijIYFiQDNysAQfPTTkJMyGPkjapzD')
    private retrievedAccessToken: string = null;
    private nextPath: string = null;

    private tweetsBasePath: string = 'https://api.twitter.com/1.1/search/tweets.json';

    constructor(public http: Http, private store: Store<any>) {
        const tweetsState = this.store.select((state) => state.tweets);

        // extract nextPath whenever something changed
        tweetsState.subscribe((tweetsState: TweetState) => {
            if (tweetsState.tweetsMeta) {
                this.nextPath = tweetsState.tweetsMeta.next_results;
            }

        })
    }

    public search(phrase: string = '#javascript'): Observable<any> {
        this.store.dispatch({ type: RESET_TWEETS })
        this.store.dispatch({ type: FETCH_SEARCH_TWITTER });
        const s = `${this.tweetsBasePath}?q=${encodeURIComponent(phrase)}`;
        return this.issueToken().do(() => this.http.get(s, { headers: this.getHeadersWithAccessToken() })
            .map(res => res.json())
            .map((data: SearchResult) => this.dispatchSearchResultData(data, false)).subscribe())
    }

    public searchNext() {
        if (!this.nextPath) {
            console.warn('next path is not set!')
            return new Observable((sub) => {
                sub.complete();
            });
        }
        this.store.dispatch({ type: FETCH_NEXT_TWEETS });
        return this.issueToken().do(() => this.http.get(`${this.tweetsBasePath}${this.nextPath}`, {
            headers: this.getHeadersWithAccessToken()
        })
            .map(res => res.json())
            .map((data: SearchResult) => {
                this.dispatchSearchResultData(data, true);
                return data;
            }).subscribe())
    }

    private getHeadersWithAccessToken() {
        return new Headers({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.retrievedAccessToken
        });
    }

    private issueToken() {
        if (this.retrievedAccessToken) {
            return Observable.of(this.retrievedAccessToken);
        }

        const headers = new Headers({
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            'Authorization': 'Basic ' + this.tokenCredentials
        });
        return this.http.post('https://api.twitter.com/oauth2/token', 'grant_type=client_credentials', { headers })
            .map(res => res.json())
            .map(data => this.retrievedAccessToken = data.access_token);
    }

    private dispatchSearchResultData(result: SearchResult, isLoadMore: boolean = false) {
        this.nextPath = result.search_metadata.next_results;

        return this.store.dispatch({
            type: isLoadMore ? RECEIVE_NEXT_TWEETS : RECEIVE_SEARCH_TWITTER,
            payload: {
                tweets: result.statuses,
                tweetsMeta: result.search_metadata,
                receivedAt: Date.now(),
            }
        });
    }
}