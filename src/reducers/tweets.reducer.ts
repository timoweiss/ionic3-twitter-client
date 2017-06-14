import { Action } from '@ngrx/store';

import * as Actions from '../constants/tweets.actions';

import { TweetState } from '../types/tweets.types';

const initialState: TweetState = {
    tweets: [],
    tweetsMeta: null,
    searchTerm: '#javascript',
    receivedAt: 0,
    isFetching: false,
}

export function tweetsReducer(state: TweetState = initialState, action: Action) {
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