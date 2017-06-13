import { Action } from '@ngrx/store';

import { ISearchMetadata } from '../services/twitter.service';

export const FETCH_SEARCH_TWITTER = 'FETCH_SEARCH_TWITTER';
export const RECEIVE_SEARCH_TWITTER = 'RECEIVE_SEARCH_TWITTER';
export const FETCH_NEXT_TWEETS = 'FETCH_NEXT_TWEETS';
export const RECEIVE_NEXT_TWEETS = 'RECEIVE_NEXT_TWEETS';
export const RESET_TWEETS = 'RESET_TWEETS';

export interface TweetState {
    tweets: Array<any>
    tweetsMeta: ISearchMetadata
    searchTerm: string
    receivedAt: number
    isFetching: boolean
}

const initialState: TweetState = {
    tweets: [],
    tweetsMeta: null,
    searchTerm: '#javascript',
    receivedAt: 0,
    isFetching: false,
}

export function tweetsReducer(state = initialState, action: Action) {
    switch (action.type) {
        case FETCH_SEARCH_TWITTER:
            return { ...state, isFetching: true };
        case RECEIVE_SEARCH_TWITTER: {
            return {
                ...state,
                tweets: action.payload.tweets,
                tweetsMeta: action.payload.tweetsMeta,
                searchTerm: decodeURIComponent(action.payload.tweetsMeta.query),
                isFetching: false,
            };
        }

        case FETCH_NEXT_TWEETS: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case RECEIVE_NEXT_TWEETS: {
            return {
                ...state,
                tweets: [...state.tweets, ...action.payload.tweets],
                isFetching: false,
            }
        }


        case RESET_TWEETS:
            return { ...state, ...initialState, searchTerm: state.searchTerm };

        default:
            return state;
    }
}