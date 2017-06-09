import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';

import { TwitterService, ISearchMetadata, IStatus } from '../../services/twitter.service';

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

  constructor(public navCtrl: NavController, private twitterService: TwitterService) {

  }

  ngOnInit() {

    this.twitterService
      .issueToken()
      .subscribe(() => {
        this.fetchTweets();
        setInterval(() => this.fetchTweets(), 15000)

      })

  }

  fetchTweets() {
    this.twitterService
      .search()
      .subscribe(data => this.tweets = data.statuses);
  }

}
