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
    templateUrl: 'tweet-detail.html'
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
