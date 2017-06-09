import { Pipe, PipeTransform, Injectable } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'search',
})
@Injectable()
export class SearchPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(tweets: Array<any>, searchterm) {
    if (!searchterm) {
      return tweets;
    }
    const filtered = tweets.filter(tweet => tweet.text.includes(searchterm));
    console.log({ searchterm, filtered })
    return filtered

  }
}
