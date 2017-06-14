
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
export type User = {
    contributors_enabled: boolean;
    created_at: Date;
    default_profile: boolean;
    default_profile_image: boolean;
    description: string;
    entities: any;
    favourites_count: number;
    follow_request_sent: any;
    followers_count: number;
    following: any;
    friends_count: number;
    geo_enabled: boolean;
    has_extended_profile: boolean;
    id: number;
    id_str: string;
    is_translation_enabled: boolean;
    is_translator: boolean;
    lang: string;
    listed_count: number;
    location: string;
    name: string;
    notifications: any;
    profile_background_color: string;
    profile_background_image_url: URL;
    profile_background_image_url_https: URL;
    profile_background_tile: boolean;
    profile_banner_url: URL;
    profile_image_url: URL;
    profile_image_url_https: URL;
    profile_link_color: string;
    profile_sidebar_border_color: string;
    profile_sidebar_fill_color: string;
    profile_text_color: string;
    profile_use_background_image: boolean;
    protected: boolean;
    screen_name: string;
    statuses_count: number;
    time_zone: string;
    translator_type: string;
    url: URL;
    utc_offset: number;
    verified: boolean;
}

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
    user: User;
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