import { Pipe, PipeTransform } from '@angular/core';
import { Status } from '../../types/tweets.types';

/**
 * Generated class for the SorttweetsPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'sorttweets',
})
export class SorttweetsPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: Array<Status>, sortBy: 'none' | 'date' | 'author' = 'none') {
    console.log('sorting')
    return value.sort((a, b) => {
      if (sortBy === 'none') {
        return b.id - a.id;
      } else if (sortBy === 'date') {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      } else if (sortBy === 'author') {
        if (a.user.name < b.user.name) return -1;
        if (a.user.name > b.user.name) return 1;
        return 0;
      }
    }).map(e => e);
  }
}
