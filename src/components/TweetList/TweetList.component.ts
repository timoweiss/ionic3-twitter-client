import { ChangeDetectionStrategy, Component, Input, OnInit, OnChanges, SimpleChange, ElementRef, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { IStatus } from '../../services/twitter.service';

@Component({
    selector: 'tweet-list',
    templateUrl: 'TweetList.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TweetList implements OnInit, OnChanges {


    @Input()
    // tslint:disable-next-line
    private tweetsState: any;

    @Input()
    // tslint:disable-next-line
    private filter: string;

    @Input()
    // tslint:disable-next-line
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

    showDetail(tweet: IStatus) {
        this.navCtrl.push('TweetDetailPage', {
            ...tweet
        })
    }
}
