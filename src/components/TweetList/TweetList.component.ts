import { Component, Input, OnInit, OnChanges, SimpleChange, ElementRef, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import 'rxjs/add/operator/toPromise';
import { IStatus } from '../../services/twitter.service';

@Component({
    selector: 'tweet-list',
    templateUrl: 'TweetList.html'
})
export class TweetList implements OnInit, OnChanges {

    // actually rendered tweets
    private _tweets: Array<IStatus> = [];

    @Input()
    // tslint:disable-next-line
    private tweets: Array<IStatus> = [];

    @Input()
    private loadMore: Function = () => { };

    @Input() searchTwitter: Function = () => { };
    @ViewChild('searchbar') searchbarInput;

    // buffered tweets, they are loaded but not shown
    private tweetBuffer: Array<IStatus> = [];

    // show loading-indicator
    private isLoading: boolean = false;

    private targetTop: any;
    private term: string = '';
    private searchOnline: boolean = false;

    constructor(public navCtrl: NavController, public myElement: ElementRef) {

    }

    // tslint:disable-next-line
    private flushBuffer() {
        console.log('flushing tweetbuffer')

        this.targetTop.scrollIntoView();
        setTimeout(() => {
            this._tweets = [...this.tweetBuffer, ...this._tweets];
            this.tweetBuffer = [];
        }, 200)
    }

    ngOnInit() {
        this.targetTop = this.myElement.nativeElement;
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


    public clearAllTweets(): void {
        this._tweets = [];
        this.tweetBuffer = [];
    }

    // tslint:disable-next-line
    private doInfinite(infiniteScroll): Promise<any> {
        const more = this.loadMore();
        if (!more) {
            return Promise.resolve([]);
        }
        return more
            .toPromise()
            .then(newTweets => this._tweets = [...this._tweets, ...newTweets]);
    }

    public searchFn(input) {
        this.term = input.target.value;

        console.log('searchFn', this.term, { searchOnline: this.searchOnline });
        if (this.searchOnline) {
            return this.searchTwitter(this.term);
        }
    }

    public toggleSearchOnline() {

        this.searchOnline = !this.searchOnline;

        if (this.searchOnline) {
            this.clearAllTweets();
            this.searchTwitter(this.searchbarInput.value);

        }
    }

}
