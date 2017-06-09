import { Component, Input, OnInit, OnChanges, SimpleChange } from '@angular/core';
import { NavController } from 'ionic-angular';

import { IStatus } from '../../services/twitter.service';

@Component({
    selector: 'tweet-list',
    templateUrl: 'TweetList.html'
})
export class TweetList implements OnInit, OnChanges {

    @Input() name: string;

    private _tweets: Array<IStatus> = [];
    @Input()
    private tweets: Array<IStatus> = [];

    private tweetBuffer: Array<IStatus> = [];

    isLoading: boolean = false;

    // @Input()
    // set tweets(tweets: Array<IStatus>) {
    //     debugger
    //     if (!tweets) {
    //         // probably loading?
    //         return;
    //     }
    //     this.loader ? this.loader.dismiss() : null;
    //     this._tweets = tweets;
    // }

    constructor(public navCtrl: NavController) {
        // setInterval(() => console.log(this.tweets), 2000)
    }

    flushBuffer() {
        console.log('flushing tweetbuffer')
        this._tweets = [...this.tweetBuffer, ...this._tweets];
        this.tweetBuffer = [];
    }

    ngOnInit() {
        this.isLoading = true;
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        this.isLoading = false;
        if (changes.tweets.firstChange) {

        } else {
            if (!this._tweets.length) {
                return this._tweets = changes.tweets.currentValue;
            }

            console.log('new tweets available');
            // are there any new tweets which are not in the shown list?
            const newTweetsList = this.getOutersection(changes.tweets.currentValue, this._tweets)
            // are there any new tweets which are not in the shown list and not in buffer?
            const newTweetsBuffer = this.getOutersection(newTweetsList, this.tweetBuffer)

            this.tweetBuffer = [...newTweetsBuffer, ...this.tweetBuffer]
        }
        console.log(changes)
    }

    private getOutersection(newList, oldList) {
        return newList.filter(tweet => !oldList.some(existingTweet => existingTweet.id === tweet.id))
    }

}
