import { Component, Input, OnInit, OnChanges, SimpleChange, ElementRef, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';
import { IStatus } from '../../services/twitter.service';
import { TweetState } from '../../reducers/tweetsReducer';

@Component({
    selector: 'tweet-list',
    templateUrl: 'TweetList.html'
})
export class TweetList implements OnInit, OnChanges {


    @Input()
    // tslint:disable-next-line
    private tweetsState: any;

    @Input()
    private filter: string;

    @Input()
    private searchOnline: boolean;


    private targetTop: any;


    constructor(public navCtrl: NavController, public myElement: ElementRef) {

    }

    ngOnInit() {
        this.targetTop = this.myElement.nativeElement;

        setInterval(() => console.log(this.tweetsState), 10000)
    }


    ngOnChanges(changes: { [propKey: string]: SimpleChange }) {
        console.log('changes', changes);

        if (changes.tweets && !changes.tweets.firstChange) {
            // this.handleTweetsChange(changes.tweets);
        }
    }

    private getOutersection(newList, oldList) {
        return newList.filter(tweet => !oldList.some(existingTweet => existingTweet.id === tweet.id))
    }

    // private handleTweetsChange(tweetChange) {
    //     if (!this._tweets.length) {
    //         return this._tweets = tweetChange.currentValue;
    //     }
    //     // are there any new tweets which are not in the shown list?
    //     const newTweetsList = this.getOutersection(tweetChange.currentValue, this._tweets)
    //     // are there any new tweets which are not in the shown list and not in buffer?
    //     const newTweetsBuffer = this.getOutersection(newTweetsList, this.tweetBuffer)

    //     this.tweetBuffer = [...newTweetsBuffer, ...this.tweetBuffer]
    // }


    // public clearAllTweets(): void {
    //     this._tweets = [];
    //     this.tweetBuffer = [];
    // }
}
