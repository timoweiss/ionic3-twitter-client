import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { TwitterService } from '../../services/twitter.service';

import { Store } from '@ngrx/store';
import { TweetState } from '../../reducers/tweetsReducer';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {


  @ViewChild('searchbar') searchbarInput;

  private searchTerm: string = '#TheresaMay';
  private tweetsState: Observable<TweetState>;

  private searchOnline: boolean = false;

  private term: string = '';

  constructor(public navCtrl: NavController, private twitterService: TwitterService, private store: Store<any>) {
    this.tweetsState = store.select(state => state.tweets);
    console.log('this.tweetsState', this.tweetsState)
  }

  ngOnInit() {

    this.tweetsState.subscribe(tweetsState => {
      this.searchTerm = tweetsState.searchTerm;
    })

    this.twitterService
      .issueToken()
      .subscribe(() => this.fetchTweets())
  }

  fetchTweets(updateNextPath: boolean = true) {
    this.twitterService
      .search(this.searchTerm)
      .subscribe();
  }

  /**
   * fn to load more tweets based on prev search
   * use arrow since fn is called from child-component (this binding)
   */
  loadMoreTweets = () => {
    return this.twitterService
      .searchNext(/*this.nextTweetsQueryPath*/)
      .toPromise()
  }

  /**
   * fn to perform an online search
   */
  searchTwitter = (searchTerm: string) => {
    if (!searchTerm) {
      return;
    }
    this.twitterService.search(searchTerm || '#nodejs')
      .subscribe();
  }

  public searchFn(input) {

    this.term = input.target.value;

    if (!this.term || !this.term.length) {
      return;
    }

    console.log('searchFn', this.term, { searchOnline: this.searchOnline });
    if (this.searchOnline) {
      if (this.term.length <= 3) {

      }
      return this.searchTwitter(this.term);
    }
  }

  public toggleSearchOnline() {

    this.searchOnline = !this.searchOnline;

    if (this.searchOnline) {
      // TODO: move to reducer/dispatch action
      // this.tweetListComponent.clearAllTweets();
      this.searchTwitter(this.searchbarInput.value);

    }
  }


  /**
   * infinit scroll callback fn
   */
  // tslint:disable-next-line
  private doInfinite(): Promise<Array<any>> {
    console.log('doInfinite')
    return this.loadMoreTweets()
      .then(result => {
        console.log('result from infinit received')
        return result;
      })
  }

  /**
   * pull to refresh callback fn
   * @param refresher - refresher instance
   */
  // tslint:disable-next-line
  private doRefresh(refresher) {
    console.log('ptr');
    return this.twitterService.search(this.searchTerm)
      .subscribe(() => refresher.complete());
  }


}
