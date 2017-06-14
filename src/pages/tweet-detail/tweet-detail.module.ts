
import { NgModule } from '@angular/core';
import { TweetDetailPage } from './tweet-detail';
import { IonicPageModule } from 'ionic-angular';

import { LinkyModule } from 'angular-linky';
import { TweetDetail } from '../../components/TweetDetail/TweetDetail.component'

@NgModule({
    declarations: [TweetDetailPage, TweetDetail],
    imports: [
        IonicPageModule.forChild(TweetDetailPage),
        LinkyModule
    ],
})
export class TweetDetailPageModule { }
