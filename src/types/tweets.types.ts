
export type SearchMetadata = {
    completed_in: number;
    count: number;
    max_id: number;
    max_id_str: string;
    next_results: string;
    query: string;
    refresh_url: string;
    since_id: number;
    since_id_str: string;
}

// entities
// {
//         hashtags: [
//             {text: "JavaScript", indices: [19, 30]}, {text: "Developer", indices: [31, 41]},…],…}

// metadata
// {iso_language_code: "en", result_type: "recent"}


// retweeted_status
// {created_at: "Thu Jun 08 13:45:42 +0000 2017", id: 872811877306433500, id_str: "872811877306433536",…}
export type Status = {
    contributors?: any;
    coordinates?: any;
    created_at?: string
    entities?: any;
    favorite_count?: number;
    favorited?: boolean;
    geo?: any;
    id?: number
    id_str?: string;
    in_reply_to_screen_name?: any;
    in_reply_to_status_id?: any;
    in_reply_to_status_id_str?: any;
    in_reply_to_user_id?: any;
    in_reply_to_user_id_str?: any;
    is_quote_status?: boolean;
    lang?: string;
    metadata?: any;
    place?: any;
    retweet_count?: number;
    retweeted?: boolean;
    retweeted_status?: any;
    source?: string;//link
    text: string;
    truncated?: boolean;
}

export type SearchResult = {
    search_metadata: SearchMetadata;
    statuses: Array<Status>;
}

export type TweetState = {
    tweets: Array<any>
    tweetsMeta: SearchMetadata
    searchTerm: string
    receivedAt: number
    isFetching: boolean
}