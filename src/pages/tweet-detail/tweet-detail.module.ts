
import { NgModule } from '@angular/core';
import { TweetDetailPage } from './tweet-detail';
import { IonicPageModule } from 'ionic-angular';
import { LinkyModule } from 'angular-linky';

@NgModule({
    declarations: [TweetDetailPage],
    imports: [
        IonicPageModule.forChild(TweetDetailPage),
        LinkyModule,
    ],
})
export class HomePageModule { }
