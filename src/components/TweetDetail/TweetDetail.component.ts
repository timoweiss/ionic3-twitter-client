import {
    Component,
    Input,
    ElementRef
} from '@angular/core';
import { Status } from '../../types/tweets.types';

@Component({
    selector: 'tweet-detailview',
    template: `
        <ion-item *ngIf="!selectedTweet">
            Please provide a tweet
        </ion-item>
         <ion-card *ngIf="selectedTweet">
            <ion-item >
                <ion-row *ngIf="isRetweet">
                    <ion-note item-end style="text-align:right;margin-left:0">
                        @{{parentTweet?.user.screen_name}} has retweeted
                    </ion-note>
                </ion-row>
                <ion-avatar [ngStyle]="{'padding-top': isRetweet ? '30px' : 'inherit'}" item-start>
                    <img src="{{selectedTweet.user.profile_image_url_https}}">
                </ion-avatar>
                
                <h2>{{selectedTweet.user.name}}</h2>
                <p>@{{selectedTweet.user.screen_name}}</p>
            </ion-item>

            <ion-card-content>
                <inappopener [linkedContent]="selectedTweet.text | linky:{mention:'twitter', hashtag:'twitter' }"></inappopener>
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
                <ion-col center text-center col-6 >
                    <ion-note item-end>
                        {{selectedTweet.created_at | date:'medium'}}
                    </ion-note>
                </ion-col>
            </ion-row>
        </ion-card>
    
    
    `,
})
export class TweetDetail {

    @Input()
    selectedTweet: Status = null;
    @Input()
    parentTweet: Status = null;
    @Input()
    isRetweet: boolean;

    constructor(public myElement: ElementRef) { }
}
