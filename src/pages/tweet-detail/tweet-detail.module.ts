
import { NgModule } from '@angular/core';
import { TweetDetailPage } from './tweet-detail';
import { IonicPageModule } from 'ionic-angular';

import { LinkyModule } from 'angular-linky';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { TweetDetail } from '../../components/TweetDetail/TweetDetail.component';
import { InappopenerComponent } from '../../components/inappopener/inappopener';

@NgModule({
    declarations: [TweetDetailPage, TweetDetail, InappopenerComponent],
    imports: [
        IonicPageModule.forChild(TweetDetailPage),
        LinkyModule
    ],
    providers: [InAppBrowser]
})
export class TweetDetailPageModule { }
