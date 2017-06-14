import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnInit,
    OnChanges,
    SimpleChange,
    ElementRef
} from '@angular/core';
import { NavController } from 'ionic-angular';
import { Status } from '../../types/tweets.types';

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


    @Input()
    // tslint:disable-next-line
    private sortBy: 'date' | 'author';


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

    showDetail(tweet: Status) {
        this.navCtrl.push('TweetDetailPage', {
            ...tweet
        })
    }
}
