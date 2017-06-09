import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IStatus } from '../../services/twitter.service';

@Component({
    selector: 'tweet-list',
    templateUrl: 'TweetList.html'
})
export class TweetList implements OnInit, OnChanges {

    // actually rendered tweets
    private _tweets: Array<IStatus> = [];

    @Input()
    private tweets: Array<IStatus> = [];

    // buffered tweets, they are loaded but not shown
    private tweetBuffer: Array<IStatus> = [];

    // show loading-indicator
    private isLoading: boolean = false;

    constructor(public navCtrl: NavController) {

    }

    private flushBuffer() {
        console.log('flushing tweetbuffer')
        this._tweets = [...this.tweetBuffer, ...this._tweets];
        this.tweetBuffer = [];
    }

    ngOnInit() {
        this.isLoading = true;
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

        this.isLoading = false;

        if (changes.tweets && !changes.tweets.firstChange) {
            this.handleTweetsChange(changes.tweets);
        }
    }

    private getOutersection(newList, oldList) {
        return newList.filter(tweet => !oldList.some(existingTweet => existingTweet.id === tweet.id))
    }

    private handleTweetsChange(tweetChange) {
        if (!this._tweets.length) {
            return this._tweets = tweetChange.currentValue;
        }
        // are there any new tweets which are not in the shown list?
        const newTweetsList = this.getOutersection(tweetChange.currentValue, this._tweets)
        // are there any new tweets which are not in the shown list and not in buffer?
        const newTweetsBuffer = this.getOutersection(newTweetsList, this.tweetBuffer)

        this.tweetBuffer = [...newTweetsBuffer, ...this.tweetBuffer]
    }


    public clearAllTweets() {
        this._tweets = [];
        this.tweetBuffer = [];
    }

}
