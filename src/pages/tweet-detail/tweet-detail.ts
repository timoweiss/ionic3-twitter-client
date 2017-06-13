import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';
import { NavParams } from 'ionic-angular';
import { IStatus } from '../../services/twitter.service';

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
            <ion-card>
                
                <ion-item>
                    <ion-row *ngIf="isRetweet">
                        <ion-note item-end style="text-align:right;margin-left:0">
                            @{{parentTweet.user.screen_name}} has retweeted
                        </ion-note>
                    </ion-row>
                    <ion-avatar [ngStyle]="{'padding-top': isRetweet ? '30px' : 'inherit'}" item-start>
                        <img src="{{selectedTweet.user.profile_image_url_https}}">
                    </ion-avatar>
                    
                    <h2>{{selectedTweet.user.name}}</h2>
                    <p>@{{selectedTweet.user.screen_name}}</p>
                </ion-item>

                <ion-card-content>
                    <span [innerHTML]="selectedTweet.text | linky:{mention:'twitter', hashtag:'twitter' }"></span>
                </ion-card-content>

                <ion-row align-items-center>
                    <ion-col>
                        <button ion-button icon-left clear small>
                            <ion-icon name="heart"></ion-icon>
                            <div>{{selectedTweet.favorite_count || 0}}</div>
                        </button>
                    </ion-col>
                    <ion-col>
                        <button ion-button icon-left clear small>
                            <ion-icon name="repeat"></ion-icon>
                            <div>{{selectedTweet.retweet_count || 0}}</div>
                        </button>
                    </ion-col>
                    <ion-col center text-center col-5 >
                        <ion-note item-end>
                            {{selectedTweet.created_at | date:'medium'}}
                        </ion-note>
                    </ion-col>
                </ion-row>
            </ion-card>
        </ion-content>
    `
})
export class TweetDetailPage {

    private selectedTweet: IStatus = null;
    private parentTweet: IStatus = null;
    private isRetweet: boolean;

    constructor(public navParams: NavParams) {
        this.selectedTweet = navParams.data.retweeted_status ? navParams.data.retweeted_status : navParams.data;

        if (navParams.data.retweeted_status) {
            this.isRetweet = true;
            this.parentTweet = navParams.data;
        }
    }
}
