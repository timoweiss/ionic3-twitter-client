import { Action } from '@ngrx/store';

import { SearchMetadata } from '../services/twitter.service';
import * as Actions from '../constants/tweets.actions';

export type TweetState = {
    tweets: Array<any>
    tweetsMeta: SearchMetadata
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
        case Actions.FETCH_SEARCH_TWITTER:
            return { ...state, isFetching: true };

        case Actions.RECEIVE_SEARCH_TWITTER: {
            return {
                ...state,
                tweets: action.payload.tweets,
                tweetsMeta: action.payload.tweetsMeta,
                searchTerm: decodeURIComponent(action.payload.tweetsMeta.query),
                isFetching: false,
            };
        }

        case Actions.FETCH_NEXT_TWEETS: {
            return {
                ...state,
                isFetching: true,
            }
        }

        case Actions.RECEIVE_NEXT_TWEETS: {
            return {
                ...state,
                tweets: [...state.tweets, ...action.payload.tweets],
                isFetching: false,
            }
        }

        case Actions.RESET_TWEETS:
            return { ...state, ...initialState, searchTerm: state.searchTerm };

        default:
            return state;
    }
}