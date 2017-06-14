
import { NgModule } from '@angular/core';
import { HomePage } from './home';
import { IonicPageModule } from 'ionic-angular';
import { TweetList } from '../../components/TweetList/TweetList.component';
import { SearchPipe } from '../../pipes/search/search';

import { SorttweetsPipe } from '../../pipes/sorttweets/sorttweets';


import { SpeechRecognition } from '@ionic-native/speech-recognition';

@NgModule({
    declarations: [HomePage, TweetList, SearchPipe, SorttweetsPipe],
    imports: [IonicPageModule.forChild(HomePage)],
    providers: [SpeechRecognition]
})
export class HomePageModule { }
