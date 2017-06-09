
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { TweetList } from '../../components/TweetList/TweetList.component';

@NgModule({
    declarations: [HomePage, TweetList],
    imports: [IonicPageModule.forChild(HomePage)],
})
export class HomePageModule { }
