import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams, Nav } from 'ionic-angular';
import { Status } from '../../types/tweets.types';

@IonicPage()
@Component({
    selector: 'tweet-detail',
    template: `
        <ion-header>
            <ion-navbar>
                <ion-title>Tweet detail</ion-title>
            </ion-navbar>

        </ion-header>
        <ion-content>
           <tweet-detailview [selectedTweet]="selectedTweet" [parentTweet]="parentTweet" [isRetweet]="isRetweet"></tweet-detailview> 
        </ion-content>
    `
})
export class TweetDetailPage {

    private selectedTweet: Status = null;
    private parentTweet: Status = null;
    private isRetweet: boolean;

    constructor(public navParams: NavParams, private nav: Nav) {
        this.selectedTweet = navParams.data.retweeted_status ? navParams.data.retweeted_status : navParams.data;

        if (navParams.data.retweeted_status) {
            this.isRetweet = true;
            this.parentTweet = navParams.data;
        }
    }

    ionViewWillEnter() {
        this.nav.swipeBackEnabled = false;
    }
    ionViewWillLeave() {
        this.nav.swipeBackEnabled = true;
    }
}
