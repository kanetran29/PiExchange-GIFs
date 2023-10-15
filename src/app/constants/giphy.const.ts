export const PAGE_SIZE = 50;
export const GIPHY = {
    API_URL: 'https://api.giphy.com/v1/gifs',
    API_KEY: 'fj3yjcpN7JLgVOitTJu4KjjLPPlipOVV',
    TRENDING: '/trending',
    SEARCH: '/search',
    TRENDING_PARAMS: {
        limit: PAGE_SIZE,
        offset: 0,
        rating: 'pg-13',
        bundle: 'messaging_non_clips'
    },
    SEARCH_PARAMS: {
        q: '',
        lang: 'en',
        limit: PAGE_SIZE,
        offset: 0,
        rating: 'pg-13',
        bundle: 'messaging_non_clips'
    },
    GET_BY_ID_PARAMS: {
        rating: 'pg-13',
    }
}