import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { NavParams } from 'ionic-angular';
import { TweetState } from '../../reducers/tweetsReducer';
import { IStatus } from '../../services/twitter.service';

@IonicPage()
@Component({
    selector: 'tweet-detail',
    // templateUrl: 'tweet-detail.html',
    template: `
        <ion-header>
            <ion-navbar>
                <ion-title>Tweet detail</ion-title>
            </ion-navbar>

        </ion-header>
        <ion-content>
            <ion-card>
            <ion-item>
                <ion-avatar item-start>
                <img src="{{selectedTweet.user.profile_image_url_https}}">
                </ion-avatar>
                <h2>{{selectedTweet.user.name}}</h2>
                <p>@{{selectedTweet.user.screen_name}}</p>
            </ion-item>

                <ion-card-content>
                    {{selectedTweet.text}}
                </ion-card-content>

                <ion-row>
                    <ion-col>
                    <button ion-button icon-left clear small>
                        <ion-icon name="star"></ion-icon>
                        <div>12 Likes</div>
                    </button>
                    </ion-col>
                    <ion-col>
                    <button ion-button icon-left clear small>
                        <ion-icon name="repeat"></ion-icon>
                        <div>4 Comments</div>
                    </button>
                    </ion-col>
                    <ion-col center text-center>
                    <ion-note>
                        {{selectedTweet.created_at | date}}
                    </ion-note>
                    </ion-col>
                </ion-row>
            </ion-card>
        </ion-content>
    `
})
export class TweetDetailPage {


    private tweetsState: Observable<TweetState>;
    private selectedTweet: IStatus = null;

    constructor(public navParams: NavParams, private store: Store<any>) {
        this.tweetsState = store.select(state => state.tweets);
        this.selectedTweet = navParams.data;

        this.tweetsState.subscribe(tweetsState => {
            console.log({ tweetsState });
        })
    }

}
