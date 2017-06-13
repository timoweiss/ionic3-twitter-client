
import { NgModule } from '@angular/core';
import { TweetDetailPage } from './tweet-detail';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [TweetDetailPage],
    imports: [IonicPageModule.forChild(TweetDetailPage)],
})
export class HomePageModule { }
