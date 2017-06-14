import { Component, OnInit, ViewChild, Renderer } from '@angular/core';
import { NavController, IonicPage, Platform } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { TwitterService } from '../../services/twitter.service';

import { Store } from '@ngrx/store';
import { TweetState } from '../../types/tweets.types';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';
import 'reflect-metadata';

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

  private speechRecognitionAvailable: boolean;

  constructor(
    public navCtrl: NavController,
    private twitterService: TwitterService,
    private store: Store<any>,
    private speechRecognition: SpeechRecognition,
    private platform: Platform,
    private renderer: Renderer,
  ) {
    this.tweetsState = store.select(state => state.tweets);
    console.log('this.tweetsState', this.tweetsState)
    this.platform.ready().then(() => {
      if (platform.is('cordova')) {
        this.speechRecognition.isRecognitionAvailable()
          .then((available: boolean) => {
            this.speechRecognitionAvailable = available;
            console.log({ available })
          })

        this.speechRecognition.requestPermission()
          .then(() => console.log('Granted'), () => console.log('Denied'))
      }

    })

  }

  ngOnInit() {

    this.tweetsState.subscribe(tweetsState => {
      this.searchTerm = tweetsState.searchTerm;
    })

    this.fetchTweets();
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

  private s(term: string) {
    console.log('searchFn', this.term, { searchOnline: this.searchOnline });
    if (this.searchOnline) {
      if (this.term.length <= 3) {
        return;
      }
      return this.searchTwitter(this.term);
    }
  }

  public searchFn(input) {
    // close keyboard if available
    input.target ? this.renderer.invokeElementMethod(input.target, 'blur') : null;
    this.term = this.searchbarInput.value;

    if (!this.term || !this.term.length) {
      return;
    }
    this.s(this.term);
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


  // tslint:disable-next-line
  private recognizeSpeech(event) {
    if (this.speechRecognitionAvailable) {
      console.log('startListening')
      this.speechRecognition.startListening()
        .subscribe((matches: Array<string>) => {
          if (matches.length) {
            const firstMatch = this.replacer(matches[0]);
            this.searchbarInput.value = firstMatch;
            this.searchFn(firstMatch);
          }
          console.log({ matches });
        },
        (onerror) => console.log('error:', onerror)
        );
    }
  }

  private replacer(input: string) {
    return input.toLowerCase()
      .replace('hashtag ', '#')
      .replace('hashtag', '#')
      .replace('user ', '@')
      .replace('user', '@')
      .replace(' underscore ', '_')
      .replace('underscore', '_')
      .replace(/ß/g, 'ss');
  }

}
