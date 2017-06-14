import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

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

import { SearchResult, TweetState } from '../types/tweets.types';

@Injectable()
export class TwitterService {
    private tokenCredentials = window.btoa('DPveMwOJTKECiF7G5bRqbpozv' + ':' + '0Xu0RHy68SLpWgd9kdsaLijIYFiQDNysAQfPTTkJMyGPkjapzD')
    private retrievedAccessToken: string = null;
    private nextPath: string = null;

    private tweetsBasePath: string = 'https://api.twitter.com/1.1/search/tweets.json';

    constructor(public http: Http, private store: Store<any>) {
        const tweetsState = this.store.select((state) => state.tweets);

        // // extract nextPath whenever something changed
        tweetsState.subscribe((tweetsState: TweetState) => {
            if (tweetsState.tweetsMeta) {
                this.nextPath = tweetsState.nextPath;
            }

        })
    }

    public search(phrase: string = '#javascript'): Observable<any> {
        console.log('new search triggered', { phrase });
        this.store.dispatch({ type: RESET_TWEETS });
        this.store.dispatch({ type: FETCH_SEARCH_TWITTER });
        const s = `${this.tweetsBasePath}?q=${encodeURIComponent(phrase)}`;
        return this.issueToken().do(() => this.http.get(s, { headers: this.getHeadersWithAccessToken() })
            .map(res => res.json())
            .map((data: SearchResult) => this.dispatchSearchResultData(data, false)).subscribe())
    }

    public searchNext(): Observable<any> {
        if (!this.nextPath) {
            console.warn('next path is not set!')
            return Observable.of(false);
        }
        this.store.dispatch({ type: FETCH_NEXT_TWEETS });
        return this.http.get(`${this.tweetsBasePath}${this.nextPath}`, {
            headers: this.getHeadersWithAccessToken()
        })
            .map(res => res.json())
            .map((data: SearchResult) => {
                this.dispatchSearchResultData(data, true);
                return data;
            });
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
        // this.nextPath = result.search_metadata.next_results;

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