export function replacer(input: string) {
    return input ? input.toLowerCase()
        .replace('hashtag ', '#')
        .replace('hashtag', '#')
        .replace('user ', '@')
        .replace('user', '@')
        .replace(' underscore ', '_')
        .replace('underscore', '_')
        .replace(/ß/g, 'ss') : '';
}