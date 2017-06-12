import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { TwitterService, IStatus } from '../../services/twitter.service';

import { TweetList } from '../../components/TweetList/TweetList.component'

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {
  tweets: Array<IStatus> = [];

  @ViewChild(TweetList)
  private tweetListComponent: TweetList;

  private nextTweetsQueryPath: string = null;

  private searchTerm: string = '#TheresaMay';

  constructor(public navCtrl: NavController, private twitterService: TwitterService) {

  }

  ngOnInit() {

    this.twitterService
      .issueToken()
      .subscribe(() => {
        this.fetchTweets();
        setInterval(() => this.fetchTweets(false), 10000)

      })

  }

  fetchTweets(updateNextPath: boolean = true) {
    this.twitterService
      .search(this.searchTerm)
      .subscribe(result => {
        if (!result.search_metadata.next_results) {
          console.error('result.search_metadata.next_results empty', result.search_metadata);
        }
        this.tweets = result.statuses
        this.nextTweetsQueryPath = updateNextPath ? result.search_metadata.next_results : this.nextTweetsQueryPath;
      });
  }

  // use arrow since fn is called from child-component (this binding)
  loadMoreTweets = () => {
    if (!this.nextTweetsQueryPath) {
      return false;
    }
    console.log('calling this.nextTweetsQueryPath', this.nextTweetsQueryPath)
    return this.twitterService
      .searchNext(this.nextTweetsQueryPath)
      .map(result => {
        if (!result.search_metadata.next_results) {
          console.error('result.search_metadata.next_results empty', result.search_metadata);
        }
        this.nextTweetsQueryPath = result.search_metadata.next_results;
        return this.nextTweetsQueryPath ? result.statuses : [];
      });
  }

  doRefresh(refresher) {
    console.log('ptr');
    this.twitterService.search(this.searchTerm)
      .subscribe(result => {
        if (!result.search_metadata.next_results) {
          console.error('result.search_metadata.next_results empty', result.search_metadata);
        }
        this.tweetListComponent.clearAllTweets();
        this.tweets = result.statuses
        this.nextTweetsQueryPath = result.search_metadata.next_results;
        refresher.complete();

      });
  }

  searchTwitter = (searchTerm: string) => {
    if (!searchTerm) {
      return;
    }
    this.twitterService.search(searchTerm || '#nodejs')
      .subscribe(result => {
        if (!result.search_metadata.next_results) {
          console.error('result.search_metadata.next_results empty', result.search_metadata);
        }
        this.searchTerm = searchTerm;
        this.tweetListComponent.clearAllTweets();
        this.tweets = result.statuses
        this.nextTweetsQueryPath = result.search_metadata.next_results;
      });
  }

}
